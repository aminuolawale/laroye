from .models import SocialAccount
from rest_framework.generics import RetrieveAPIView, CreateAPIView
from .serializers import UserSerializer,LinkSocialAccountSerializer,SocialAccountSerializer
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from .services import SocialService
from utils import Response

User = get_user_model()


class UserAccountAPI(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_data: dict = UserSerializer(request.user).data
        return Response(status.HTTP_200_OK, data=user_data)


class LinkSocialAccountAPI(CreateAPIView):
    perimission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs) -> Response:
        serializer = LinkSocialAccountSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get("username")
            provider = serializer.validated_data.get("provider")
            social_account_service = SocialService(
                request.user, username, provider)
            social_account: SocialAccount = social_account_service.create_user_social_account()
            if social_account is not None:
                social_account_data: dict = SocialAccountSerializer(
                    social_account).data
                return Response(status.HTTP_201_CREATED, data=social_account_data)
            return Response(status.HTTP_400_BAD_REQUEST, errors=dict(non_field_errors=["Could not retrieve social account details"]))
        return Response(status.HTTP_400_BAD_REQUEST, errors=serializer.errors)

    def get(self, request, *args, **kwargs) -> Response:
        social_accounts = SocialAccount.objects.filter(user=request.user).all()
        social_accounts_data = SocialAccountSerializer(
            list(social_accounts), many=True).data
        return Response(status.HTTP_200_OK,data=social_accounts_data)


class ImportSocialAccountData(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs) -> Response:
        pk = request.data.get("id")
        social_data_service = SocialService(int(pk))
        import_errors  = social_data_service.import_data()
        if import_errors:
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR, errors=dict(non_field_errors=import_errors))
        return Response(status.HTTP_201_CREATED)
