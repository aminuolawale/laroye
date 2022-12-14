from django.contrib.auth.base_user import BaseUserManager
from django.db.models import Manager as BaseManager
from django.utils.translation import gettext_lazy as _
from typing import Dict, Any, Optional
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from datetime import datetime
import pytz


class UserManager(BaseUserManager):
    def create_user(
        self,
        email: str,
        password: Optional[str] = None,
        is_super_user: bool = False,
        **extra_fields: Dict[str, Any]
    ) -> AbstractUser:
        if not email:
            raise ValueError(_("Email is required"))
        email: str = self.normalize_email(email)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_staff", is_super_user)
        extra_fields.setdefault("is_superuser", is_super_user)
        extra_fields.setdefault("is_verified", is_super_user)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        return user

    def create_superuser(
        self, email: str, password: str, **extra_fields: Dict[str, Any]
    ) -> AbstractUser:
        return self.create_user(email, password, is_super_user=True, **extra_fields)


class SocialAccountManager(BaseManager):
    def create_social_account(
        self, user, provider, username, account_user_id, account_created_date
    ):
        account_created_date = pytz.utc.localize(
            datetime.strptime(
                account_created_date, settings.TWITTER_TWEET_CREATED_AT_TIME_FORMAT
            )
        )
        social_account = self.model(
            user=user,
            provider=provider,
            username=username,
            account_user_id=account_user_id,
            account_created_date=account_created_date,
        )
        social_account.save()
        return social_account
