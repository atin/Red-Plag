from rest_framework import serializers
from User.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('firstName', 'lastName', 'email', 'password')
