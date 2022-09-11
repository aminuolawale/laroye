from email.policy import default
from rest_framework import serializers


class SuccessResponseSerializerFactory(object):
    def __init__(self, serializer, many: bool = False) -> None:
        class ResponseSerializer(serializers.Serializer):
            success = serializers.BooleanField(default=True)
            errors = serializers.ListField(
                child=serializers.CharField(), default=[])

            data = serializer(many=many, allow_null=not many)

        self._serializer = ResponseSerializer

    @property
    def serializer(self):
        return self._serializer


class ErrorResponseSerializerFactory(object):
    def __init__(self, many: bool = False) -> None:
        class ResponseSerializer(serializers.Serializer):
            success = serializers.BooleanField(default=False)
            errors = serializers.DictField()

        self._serializer = ResponseSerializer

    @property
    def serializer(self):
        return self._serializer
