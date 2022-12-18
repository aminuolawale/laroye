from rest_framework import serializers



class ActionSerializer(serializers.Serializer):
    model = serializers.CharField()
    payload = serializers.ListField(child=serializers.DictField())
    action = serializers.CharField()


