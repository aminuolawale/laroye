from typing import List
from django.urls import path, include
from .api import RegistrationAPI, UserAPI
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns: List[path] = [
    path("auth/registration/", RegistrationAPI.as_view()),
    path("auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("<int:pk>/", UserAPI.as_view())

]
