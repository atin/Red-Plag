from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth.models import User

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

from .models import Profile
from .serializers import ProfileSerializer, LoginSerializer
from rest_framework.decorators import api_view, permission_classes


@api_view(['POST'])
def registerUser(request):
    if request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = ProfileSerializer(data=user_data)
        data = {}
        # print(user_serializer.initial_data)
        if user_serializer.is_valid():
            user_serializer.save()
            data['username'] = user_data['username']
            uid = User.objects.get(username=data['username'])
            token = Token.objects.get(user=uid)
            data['token'] = token.key
            return JsonResponse(data, status=status.HTTP_201_CREATED)
        else:
            data = user_serializer.errors()
            return JsonResponse(data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def loginUser(request):
    if request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = LoginSerializer(data=user_data)
        data = {}
        if user_serializer.is_valid():
            user = user_serializer.validated_data['user']
            try:
                uid = User.objects.get(
                    username=user['username'])
                if not uid.check_password(user['password']):
                    raise Exception
                token = Token.objects.get(user=uid)
                data['token'] = token.key
                data['response'] = 'Successful login'
                return JsonResponse(data, status=status.HTTP_202_ACCEPTED)
            except:
                data['response'] = "Username or password does not exist"
                return JsonResponse(data, status=status.HTTP_401_UNAUTHORIZED)


#     # return JsonResponse({}, status=status.HTTP_200_OK)
