from rest_framework import serializers



class ActionSerializer(serializers.Serializer):
    model = serializers.CharField()
    text = serializers.CharField()
    action = serializers.CharField()