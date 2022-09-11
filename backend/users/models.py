from typing import Tuple
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import UserManager
from typing import List


class User(AbstractUser):
    username: models.CharField = models.CharField(
        max_length=30, blank=False, unique=True)
    email: models.EmailField = models.EmailField(
        _('Email Address'), blank=False, unique=True)
    first_name: models.CharField = models.CharField(max_length=30, blank=False)
    last_name: models.CharField = models.CharField(max_length=30, blank=False)
    profile_picture: models.URLField = models.URLField(blank=True)
    is_verified: models.BooleanField = models.BooleanField(default=False)
    date_of_birth: models.DateField = models.DateField(null=True)
    date_created: models.DateTimeField = models.DateTimeField(
        auto_now_add=True, blank=False)
    last_updated: models.DateTimeField = models.DateTimeField(
        auto_now=True, blank=False)

    objects: UserManager = UserManager()
    USERNAME_FIELD: str = "email"
    REQUIRED_FIELDS: List[str] = []

    def __str__(self) -> str:
        return self.email
