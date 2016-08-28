from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/get_cookie/$', views.get_cookie, name='get_cookie'),
    url(r'^api/get_board_list/$', views.get_board_list, name='get_board_list'),
    url(r'^api/show_board/$', views.show_board, name='show_board'),
    url(r'^api/thread/$', views.thread, name='thread'),
    url(r'^api/post_thread/$', views.post_thread, name='post_thread'),
    url(r'^b/(\d+)/$', views.b, name='b'),
    url(r'^b/(\d+)/(\d+)/$', views.b, name='b'),
]
