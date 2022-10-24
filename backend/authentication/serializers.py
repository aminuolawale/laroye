from rest_framework import serializers


class SocialAuthenticationSerializer(serializers.Serializer):
    token = serializers.CharField()
    provider = serializers.CharField()
