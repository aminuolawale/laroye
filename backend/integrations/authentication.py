import requests
from .base import RestAPIMixin
from django.conf import settings
from google.auth import jwt


class GoogleAuth:
    def __init__(self, token) -> None:
        self.token = token

    def validate(self):
        data = jwt.decode(self.token, verify=False)
        email = data.get('email')
        username = email.split("@")[0].strip()

        return dict(
            email=email,
            username=username,
            first_name=data.get('given_name', ""),
            last_name=data.get("family_name", ""),
            profile_picture=data.get('picture'),
            source='google',
            is_verified=data.get("email_verified")
        )


SOCIAL_AUTH_API_MAPPING = {
    'google': GoogleAuth
}
