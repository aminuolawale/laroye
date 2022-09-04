from urllib.parse import uses_relative
from django.contrib import admin
from .models import User
# Register your models here.

admin.site.register(User)
