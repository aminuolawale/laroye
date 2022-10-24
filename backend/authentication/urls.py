from django.urls import path
from .api import AuthenticationView

urlpatterns = [
    path('social-login/', AuthenticationView.as_view(), name='auth_social_login')
]
