from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator


User = get_user_model()


class RegistrationSerializer(serializers.Serializer):
    email: serializers.EmailField = serializers.EmailField(
        max_length=100, validators=[UniqueValidator(queryset=User.objects.all())])
    password: serializers.CharField = serializers.CharField()
    first_name: serializers.CharField = serializers.CharField()
    last_name: serializers.CharField = serializers.CharField()

    def save(self) -> User:
        if not self.validated_data.get("username"):
            self.validated_data["username"] = self.get_username_from_email(
                self.validated_data["email"])
        return User.objects.create_user(**self.validated_data)

    def get_username_from_email(self, email: str) -> str:
        return email.split("@")[0].strip()
