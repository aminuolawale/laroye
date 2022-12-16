from rest_framework.views import APIView
from .serializers import ActionSerializer
from utils import Response
from .services import ActionsService
from rest_framework import status

class ActionsView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ActionSerializer(data=request.data)
        if serializer.is_valid():
            actions_service = ActionsService(serializer.validated_data)
            result = actions_service.evaluate()
            return Response(status.HTTP_200_OK, data=result)
        return Response(status.HTTP_400_BAD_REQUEST, errors = serializer.errors)