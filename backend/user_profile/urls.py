from django.urls import path
from . import views as user_profile_views
#from rest_framework.authtoken import views as authtoken_views
urlpatterns = [
    path('signup/', user_profile_views.registerUser, name='register-user'),
    path('login/', user_profile_views.loginUser, name='login-user'),
    path('upload', user_profile_views.uploadFiles, name='upload-files')
]
