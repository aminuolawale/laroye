from email.policy import default
from typing import Tuple
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import UserManager, SocialAccountManager
from typing import List


SOCIAL_ACCOUNT_PROVIDER_CHOICES = [
    ("twitter", "twitter"),
    ("instagram", "instagram"),
    ("facebook", "facebook"),
]

AUTHENTICATION_PROVIDER_CHOICES = [
    ('google', 'google'),
    ('custom', 'custom')
]


class User(AbstractUser):
    username = models.CharField(
        max_length=30, blank=False, unique=True
    )
    email = models.EmailField(
        _("Email Address"), blank=False, unique=True
    )
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    source = models.CharField(
        max_length=20, blank=False, choices=AUTHENTICATION_PROVIDER_CHOICES, default='custom')
    profile_picture = models.URLField(blank=True)
    is_verified = models.BooleanField(default=False)
    date_of_birth = models.DateField(null=True)
    date_created = models.DateTimeField(
        auto_now_add=True, blank=False
    )
    last_updated = models.DateTimeField(
        auto_now=True, blank=False
    )

    objects: UserManager = UserManager()
    USERNAME_FIELD: str = "email"
    REQUIRED_FIELDS: List[str] = []

    def __str__(self) -> str:
        return self.email


class SocialAccount(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="social_accounts")
    provider = models.CharField(
        max_length=255, choices=SOCIAL_ACCOUNT_PROVIDER_CHOICES)
    username = models.CharField(max_length=255)
    account_user_id = models.CharField(max_length=255)
    account_created_date = models.DateTimeField(null=True)
    date_created = models.DateTimeField(auto_now=True)
    last_updated = models.DateTimeField(auto_now_add=True)

    objects = SocialAccountManager()

    def __str__(self) -> str:
        return f"{self.provider}.{self.username}.{self.user}"
