from authentication.services import AuthenticationService
from users.serializers import UserSerializer
from rest_framework.views import APIView
from .serializers import SocialAuthenticationSerializer
from utils import Response
from rest_framework import status


class AuthenticationView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SocialAuthenticationSerializer(data=request.data)
        if serializer.is_valid():
            token = AuthenticationService.authenticate(
                serializer.validated_data)
            return Response(status.HTTP_201_CREATED, data=token)
        return Response(status.HTTP_400_BAD_REQUEST, errors=serializer.errors)
