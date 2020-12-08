from django.forms import ModelForm, fields
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import Profile


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name',
                  'username', 'password1', 'password2']


class UploadFilesForm(models.ModelForm):
    class Meta:
        model = Profile
        fields = ['file1', 'file2']
