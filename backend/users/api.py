from rest_framework.generics import  RetrieveAPIView
from .serializers import  UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
User = get_user_model()



class UserAPI(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs) -> Response:
        user_qs = User.objects.filter(pk=pk)
        if user_qs.count() == 0:
            return Response(dict(success=False, errors={"non_field_errors": [f"user with id {pk} not found"]}, data={}), status=status.HTTP_200_OK)
        user = user_qs.first()
        user_data = UserSerializer(user).data
        return Response(dict(success=True, errors=[], data=user_data))

class AccountAPI(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs) :
        return Response (dict(success=True, errors=[], data = UserSerializer(request.user).data))