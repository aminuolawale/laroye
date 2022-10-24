
from typing import Dict
import jwt
from django.contrib.auth import get_user_model
from integrations.authentication import SOCIAL_AUTH_API_MAPPING
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class AuthenticationService:
    @classmethod
    def _decode_token(self, token: str) -> Dict:
        return jwt.decode(token)

    @classmethod
    def _get_user_account_data(cls, token, provider):
        adapter_class = SOCIAL_AUTH_API_MAPPING.get(provider)
        adapter = adapter_class(token)
        return adapter.validate()

    @classmethod
    def get_or_create_user_account(cls, data) -> User:
        token = data.get("token")
        provider = data.get("provider")
        user_account_data = cls._get_user_account_data(token, provider)
        try:
            user = User.objects.get(
                username=user_account_data.get("username"))
        except:
            user = User.objects.create_user(**user_account_data)
        return user

    @classmethod
    def authenticate(cls, data):
        user = cls.get_or_create_user_account(data)
        return cls.generate_token(user)

    @classmethod
    def generate_token(cls, user):
        refresh_obj = RefreshToken.for_user(user)
        return dict(refresh=str(refresh_obj), access=str(refresh_obj.access_token))
