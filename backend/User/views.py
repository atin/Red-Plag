from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from User.models import User
from User.serializer import UserSerializer

# API methods for a user


@csrf_exempt
def UserApi(request, email_id=''):
    if request.method == "GET":
        user = User.objects.all()
        user_serializer = UserSerializer(user, many=True)
        # To ensure conversion even if not
        return JsonResponse(user_serializer.data, safe=False)

    elif request.method == "POST":
        user = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Record added successfully!", safe=False)
        return JsonResponse("Record could not be added", safe=False)

    elif request.method == "PUT":  # This is modify
        user_data = JSONParser().parse(request)
        user = User.objects.get(email=user_data['email'])
        user_serializer = UserSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Successfully updated!", safe=False)
        return JsonResponse("Record could not be updated", safe=False)

    elif request.method == "DELETE":
        user = User.objects.get(email=email_id)
        user.delete()
        return JsonResponse("Record deleted successfully!", safe=False)
