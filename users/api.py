from urllib.request import Request
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from .serializers import RegistrationSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
User = get_user_model()


class RegistrationAPI(CreateAPIView):
    def post(self, request, *args, **kwargs) -> Response:
        registration_serializer: RegistrationSerializer = RegistrationSerializer(
            data=request.data)
        if registration_serializer.is_valid():
            user: User = registration_serializer.save()
            user_data: dict = UserSerializer(user).data
            return Response(dict(success=True, errors=[], data=user_data), status=status.HTTP_201_CREATED)
        return Response(dict(success=False, errors=registration_serializer.errors, data={}), status=status.HTTP_400_BAD_REQUEST)


class UserAPI(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs) -> Response:
        user_qs = User.objects.filter(pk=pk)
        if user_qs.count() == 0:
            return Response(dict(success=False, errors={"non_field_errors": [f"user with id {pk} not found"]}, data={}), status=status.HTTP_200_OK)
        user = user_qs.first()
        user_data = UserSerializer(user).data
        return Response(dict(success=True, errors=[], data=user_data))
