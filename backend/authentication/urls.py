from django.urls import path, include
from .api import RegistrationAPI, LoginAPI, RefreshTokenAPI
from typing import List

urlpatterns: List[path] = [
    path("registration/", RegistrationAPI.as_view(), name="auth_registration"),
    path("login/", LoginAPI.as_view(), name="auth_login"),
    path("refresh/", RefreshTokenAPI.as_view(), name="auth_token_refresh")
]
