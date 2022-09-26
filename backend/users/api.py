from .models import SocialAccount
from rest_framework.generics import RetrieveAPIView, CreateAPIView
from .serializers import (
    UserSerializer,
    LinkSocialAccountSerializer,
    SocialAccountSerializer,
)
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from .services import SocialAccountService

User = get_user_model()


class AccountAPI(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_data: dict = UserSerializer(request.user).data
        return Response(
            dict(success=True, errors=[], data=user_data)
        )


class LinkSocialAccountAPI(CreateAPIView):
    perimission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs) -> Response:
        link_social_account_serializer = LinkSocialAccountSerializer(
            data=request.data)
        if link_social_account_serializer.is_valid():
            username = link_social_account_serializer.validated_data.get(
                "username")
            provider = link_social_account_serializer.validated_data.get(
                "provider")

            social_account_service = SocialAccountService(
                request.user, username, provider
            )
            social_account: SocialAccount = social_account_service.create_user_social_account()
            if social_account is not None:
                social_account_data: dict = SocialAccountSerializer(
                    social_account).data
                return Response(dict(success=True, errors=[], data=social_account_data))
            return Response(
                dict(
                    success=False,
                    errors=dict(
                        non_field_errors=[
                            "Could not retrieve social account details"]
                    ),
                    data={},
                )
            )
        return Response(
            dict(
                success=False,
                errors=link_social_account_serializer.errors,
                data={},
            )
        )

    def get(self, request, *args, **kwargs) -> Response:
        social_accounts = SocialAccount.objects.filter(user=request.user).all()
        social_accounts_data = SocialAccountSerializer(
            list(social_accounts), many=True
        ).data
        return Response(dict(success=True, errors=[], data=social_accounts_data))


class ImportSocialAccountData(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs) -> Response:
        pk = request.data.get("id")
        social_account = SocialAccount.objects.filter(id=pk).first()
        social_account_service = SocialAccountService(
            request.user, social_account.username, social_account.provider
        )
        data = social_account_service.import_data()
        return Response(dict(success=True, errors=[], data=data))
