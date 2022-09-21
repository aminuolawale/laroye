from typing import List
from django.urls import path, include
from .api import  UserAPI, AccountAPI
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns: List[path] = [
    path("account/", AccountAPI.as_view(), name="user_account"),

]
