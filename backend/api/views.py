from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from rest_framework.parsers import JSONParser

from .serializer import UserSerializer


@csrf_exempt
def UserReg(request):
    if request.method == "POST":
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(True, safe=False)
        return JsonResponse(False, safe=False)

    # elif request.method == "PUT":
    #     user_data = JSONParser().parse(request)
    #     user = User.objects.get(username=user_data['username'])
    #     user_serializer = UserSerializer(user, data=user_data)
    #     if user_serializer.is_valid():
    #         user_serializer.save()
    #         return JsonResponse(True, safe=False)
    #     return JsonResponse(False, safe=False)

    # elif request.method == "DELETE":
    #     user = User.objects.get(username=user_data['username'])
    #     user.delete()
    #     return JsonResponse("Record deleted successfully!", safe=False)
@csrf_exempt
def UserLogin(request):
    if request.method == 'POST':
        user_data = JSONParser().parse(request)
        user = authenticate(username=user_data['username'], password=user_data['password'])

        if user is not None:
            print("Authenticated")
            login(request, user)
            return JsonResponse(True, safe=False)
        else:
            print("Wrong username or password")
            return JsonResponse(False, safe=False)
@csrf_exempt
def GetUsers(request):
    if request.method == "GET":
        user = User.objects.all()
        user_serializer = UserSerializer(user, many=True)
        return JsonResponse(user_serializer.data, safe=False)