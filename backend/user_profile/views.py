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
            data = user_serializer.data
            # token = Token.objects.get(user=profile).key
            # data['token'] = token
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


@api_view(['POST', ])
def uploadFiles(request):
    if request.method == 'POST':
        token = request.data['token']
        user = Token.objects.get(key=token).user
        user_data = user.__dict__
        # print(profile['user'])
        profile_serializer = ProfileSerializer(data=user_data)
        # print(profile_serializer.initial_data)
        data = {}
        if profile_serializer.is_valid():
            data = profile_serializer.data
            Profile.objects.update_or_create(
                user=user, defaults={'file1': request.data['file1'], 'file2': request.data['file2']})
            return JsonResponse(data, status=status.HTTP_200_OK)
        else:
            #data = profile_serializer.errors()
            return JsonResponse(data, status=status.HTTP_400_BAD_REQUEST)
