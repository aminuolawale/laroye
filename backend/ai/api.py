from rest_framework.views import APIView
from .serializers import ActionSerializer
from utils import Response
from .services import ActionsService
from rest_framework import status

class ActionsView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ActionSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.validated_data, "----------")
            model = serializer.validated_data.get("model")
            action= serializer.validated_data.get("action")
            payload = serializer.validated_data.get("payload")
            actions_service = ActionsService(model, action, payload)

            result = actions_service.evaluate()
            return Response(status.HTTP_200_OK, data=result)
        return Response(status.HTTP_400_BAD_REQUEST, errors = serializer.errors)