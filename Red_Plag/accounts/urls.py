from os import name
from django.urls import path
from . import views

urlpatterns = [
  path('', views.home, name="home"),
	path('register/', views.registerPage, name="register"),
	path('login/', views.loginPage, name="login"),
	path('logout/', views.logoutUser, name="logout"),
  path('upload/', views.uploadfile, name="upload"),
	path('algorithm/', views.initate, name="algorithm"),
	path('download/', views.filedownload, name="download"),
	path('pass-change/', views.pass_change, name="pass-change"),
]
