from rest_framework.generics import CreateAPIView
from .serializers import RegistrationSerializer
from users.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

User = get_user_model()


class RegistrationAPI(CreateAPIView):
    def post(self, request, *args, **kwargs) -> Response:
        registration_serializer = RegistrationSerializer(
            data=request.data)
        if registration_serializer.is_valid():
            user: User = registration_serializer.save()
            user_data: dict = UserSerializer(user).data
            return Response(dict(success=True, errors=[], data=user_data), status=status.HTTP_201_CREATED)
        return Response(dict(success=False, errors=registration_serializer.errors, data={}), status=status.HTTP_400_BAD_REQUEST)


class LoginAPI(TokenObtainPairView):
    def post(self, request, *args, **kwargs) -> Response:
        try:
            response = super().post(request, args, kwargs)
        except:
            return Response(dict(success=False, errors=[], data={}), status=status.HTTP_400_BAD_REQUEST)
        return Response(dict(success=response.status_code == status.HTTP_200_OK, errors=[], data=response.data), status=response.status_code)

# fix


class RefreshTokenAPI(TokenRefreshView):
    def post(self, request, *args, **kwargs) -> Response:
        try:
            response = super().post(request, args, kwargs)
        except:
            return Response(dict(success=False, errors=[], data={}), status=status.HTTP_400_BAD_REQUEST)
        return Response(dict(success=response.status_code == status.HTTP_200_OK, errors=[], data=response.data), status=response.status_code)
