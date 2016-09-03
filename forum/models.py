from django.db import models
from django.db.models import Model
from django.db.models import CharField
from django.db.models import DateTimeField
from django.db.models import TextField
from django.db.models import IntegerField
from django.db.models import ForeignKey
from django.db.models import OneToOneField
from django.db.models import BooleanField
from django.db.models import PositiveIntegerField


class Post(Model):
    user_id = CharField(max_length=50)
    image_url = CharField(max_length=255, blank=True)
    time_created = DateTimeField(auto_now_add=True)
    username = CharField(max_length=50, blank=True)
    email = CharField(max_length=50, blank=True)
    title = CharField(max_length=50, blank=True)
    text = TextField(blank=True)
    reply_count = IntegerField(default=-1)
    parent = ForeignKey('self', on_delete=models.PROTECT, null=True, blank=True, db_index=True)
    last_reply = DateTimeField(null=True, blank=True)


class Board(Model):
    name = CharField(max_length=50)
    root_post = OneToOneField(Post, on_delete=models.PROTECT)
    rank = PositiveIntegerField(default=1)
    category = IntegerField(default=0)


class User(Model):
    token = CharField(max_length=64, primary_key=True)
    time_last_updated = DateTimeField(auto_now=True)


class Settings(Model):
    open_cookies = BooleanField()
