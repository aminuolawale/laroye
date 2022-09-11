from tkinter.tix import Tree
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
from typing import Dict, Any
from django.contrib.auth.models import AbstractUser


class UserManager(BaseUserManager):
    def create_user(self, email: str, password: str,  is_super_user: bool = False, **extra_fields: Dict[str, Any]) -> AbstractUser:
        if not email:
            raise ValueError(_("Email is required"))
        email: str = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', is_super_user)
        extra_fields.setdefault('is_superuser', is_super_user)
        extra_fields.setdefault('is_verified', is_super_user)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email: str, password: str, **extra_fields: Dict[str, Any]) -> AbstractUser:
        return self.create_user(email, password, is_super_user=True, **extra_fields)
