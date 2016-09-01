import os
from urllib.parse import quote_from_bytes
from urllib.parse import unquote
from base64 import urlsafe_b64encode
from base64 import urlsafe_b64decode
from datetime import timedelta
from hashlib import sha256
from math import ceil

from django.http import HttpResponse
from django.http import JsonResponse
from django.http import HttpResponseBadRequest
from django.http import HttpResponseNotAllowed
from django.http import HttpResponseForbidden
from django.utils import timezone
from django.shortcuts import render
from django.shortcuts import redirect

from .models import User
from .models import Board
from .models import Post
from .models import Settings


def index(request):
    return render(request, 'forum/index.html')


USER_COOKIE_NAME = 'user'


def get_cookie(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])
    if not Settings.objects.get().open_cookies:
        return HttpResponseForbidden()
    cookie = request.COOKIES.get(USER_COOKIE_NAME)
    response = HttpResponse(cookie)
    if not is_valid(cookie):
        cookie = generate_cookie()
        update_cookie(cookie)
        response.set_cookie(USER_COOKIE_NAME, cookie)
    return response


def generate_cookie():
    return quote_from_bytes(urlsafe_b64encode(os.urandom(30)))


def is_valid(cookie):
    try:
        user = User.objects.get(pk=cookie)
        valid_time = timezone.now() - timedelta(days=90)
        if user.time_last_updated < valid_time:
            user.delete()
            return False
        return True
    except User.DoesNotExist:
        return False


def update_cookie(cookie):
    user = User(token=cookie)
    user.save()


def get_board_list(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])
    boards = Board.objects.all()
    data = []
    for board in boards:
        data.append({'id': board.id, 'name': board.name, 'rank': board.rank})
    return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})


DATE_FORMAT = '%a %b %d %H:%M:%S %z %Y'


def show_board(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])
    try:
        board_id = int(request.GET['id'])
        page = int(request.GET.get('page', '1'))
        if page < 1:
            raise ValueError()
        board = Board.objects.get(id=board_id)
        posts = Post.objects.filter(parent=board.root_post).order_by('-last_reply')[
                (page - 1) * 20: page * 20]
        thread_data = []
        for post in posts:
            thread_data.append({
                'id': post.id,
                'img': post.image_url,
                'created_at': post.time_created.strftime(DATE_FORMAT),
                'user': post.user_id,
                'username': post.username,
                'email': post.email,
                'title': post.title,
                'text': post.text,
                'reply_count': post.reply_count,
                'last_reply': post.last_reply.strftime(DATE_FORMAT),
            })
        data = {
            'id': board.id,
            'name': board.name,
            'page_count': ceil(Post.objects.filter(parent=board.root_post).count() / 20),
            'threads': thread_data,
        }
        return JsonResponse(data, json_dumps_params={'ensure_ascii': False})
    except (KeyError, ValueError):
        return HttpResponseBadRequest('Invalid or missing data')
    except Board.DoesNotExist:
        return HttpResponseBadRequest('Board does not exist')


def thread(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])
    try:
        thread_id = int(request.GET['id'])
        page = int(request.GET.get('page', '1'))
        if page < 1:
            raise ValueError()
        thread_root = Post.objects.get(id=thread_id)
        replies = Post.objects.filter(parent=thread_root).order_by('time_created')[
                  (page - 1) * 20: page * 20]
        replies_data = []
        for reply in replies:
            replies_data.append({
                'id': reply.id,
                'img': reply.image_url,
                'created_at': reply.time_created.strftime(DATE_FORMAT),
                'user': reply.user_id,
                'username': reply.username,
                'email': reply.email,
                'title': reply.title,
                'text': reply.text,
            })
        data = {
            'id': thread_root.id,
            'img': thread_root.image_url,
            'created_at': thread_root.time_created.strftime(DATE_FORMAT),
            'user': thread_root.user_id,
            'username': thread_root.username,
            'email': thread_root.email,
            'title': thread_root.title,
            'text': thread_root.text,
            'reply_count': thread_root.reply_count,
            'last_reply': thread_root.last_reply.strftime(DATE_FORMAT),
            'replies': replies_data,
        }
        return JsonResponse(data, json_dumps_params={'ensure_ascii': False})
    except (KeyError, ValueError):
        return HttpResponseBadRequest('Invalid or missing data')
    except Post.DoesNotExist:
        return HttpResponseBadRequest('Thread does not exist')


def get_user_id(cookie):
    cookie_bytes = urlsafe_b64decode(unquote(cookie))
    return urlsafe_b64encode(sha256(cookie_bytes).digest()).decode()[:10]


def post_thread(request):
    if request.method != 'POST':
        return HttpResponseNotAllowed(['POST'])
    cookie = request.COOKIES.get(USER_COOKIE_NAME)
    cookie_generated = False
    if not is_valid(cookie):
        if Settings.objects.get().open_cookies:
            cookie = generate_cookie()
            update_cookie(cookie)
            cookie_generated = True
        else:
            return HttpResponseForbidden()
    username = request.POST.get('username')
    if not username:
        username = '无名氏'
    email = request.POST.get('email', '')
    title = request.POST.get('title')
    if not title:
        title = '无标题'
    text = request.POST.get('text', '')
    if not text.strip():
        return HttpResponseBadRequest('Text cannot be empty')
    try:
        thread_id = int(request.POST['thread_id'])
    except (KeyError, ValueError):
        thread_id = -1
    try:
        board_id = int(request.POST['board_id'])
    except (KeyError, ValueError):
        board_id = -1
    try:
        user_id = get_user_id(cookie)
        if thread_id != -1:
            parent = Post.objects.get(id=thread_id)
            post = Post(
                user_id=user_id,
                username=username,
                email=email,
                title=title,
                text=text,
                parent=parent)
            post.save()
            parent.last_reply = post.time_created
            parent.reply_count += 1
            parent.save()
        elif board_id != -1:
            parent = Board.objects.get(id=board_id).root_post
            post = Post(
                user_id=user_id,
                username=username,
                email=email,
                title=title,
                text=text,
                reply_count=0,
                parent=parent,
                last_reply=timezone.now())
            post.save()
        else:
            return HttpResponseBadRequest('Invalid or missing data')
        update_cookie(cookie)
        response = redirect(request.META.get('HTTP_REFERER'))
        if cookie_generated:
            response.set_cookie(USER_COOKIE_NAME, cookie)
        return response
    except Post.DoesNotExist:
        return HttpResponseBadRequest('Thread does not exist')
    except Board.DoesNotExist:
        return HttpResponseBadRequest('Board does not exist')


def b(request, board_id, page=-1):
    if page != -1:
        return render(request, 'forum/show_board.html')
    else:
        return redirect('1/')


def t(request, thread_id, page=-1):
    if page != -1:
        return render(request, 'forum/show_thread.html')
    else:
        return redirect('1/')
