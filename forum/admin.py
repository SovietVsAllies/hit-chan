from django.contrib import admin

from .models import Board
from .models import Post
from .models import Settings

admin.site.register(Board)
admin.site.register(Post)
admin.site.register(Settings)
