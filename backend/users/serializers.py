from wsgiref.validate import validator
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueTogetherValidator
from .models import SocialAccount

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class SocialAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialAccount
        fields = "__all__"


class LinkSocialAccountSerializer(serializers.Serializer):
    username = serializers.CharField()
    provider = serializers.CharField()

    class Meta:
        validators = [
            UniqueTogetherValidator(
                queryset=SocialAccount.objects.all(), fields=["username", "provider"]
            )
        ]
