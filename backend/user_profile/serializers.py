from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    username = serializers.CharField(source='user.username')
    password = serializers.CharField(source='user.password')

    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'username', 'password')
        kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        print(validated_data)
        user = get_user_model().objects.create(
            username=validated_data['user']['username'],
            first_name=validated_data['user']['first_name'],
            last_name=validated_data['user']['last_name']
        )
        user.set_password(validated_data['user']['password'])
        user.save()

        profile = Profile.objects.create(user=user)

        return profile


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    password = serializers.CharField(source='user.password')

    class Meta:
        model = Profile
        fields = ('username', 'password')
        kwargs = {'password': {'write_only': True}, }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
