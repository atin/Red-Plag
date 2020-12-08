from django.contrib.messages.api import success
from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from subprocess import Popen, PIPE, STDOUT
from os.path import dirname, abspath
import os
import shutil
from django.contrib.auth.decorators import login_required

from .models import *
from .forms import CreateUserForm

def registerPage(request):
	"""
		This function handles user registration.
		If the user is already authenticated then it redirects the user to home page otherwise it renders the register page and handles user registration process.
	"""
	if request.user.is_authenticated:
		return redirect('home')
	else:
		form = CreateUserForm()
		if request.method == 'POST':
			form = CreateUserForm(request.POST)
			if form.is_valid():
				form.save()
				user = form.cleaned_data.get('username')
				messages.success(request, 'Account was created for ' + user)

				return redirect('login')

		context = {'form': form}
		return render(request, 'accounts/register.html', context)


def loginPage(request):
	"""
		This function handle user login.
		If the user is already authenticated then it redirects the user to home page otherwise it renders the login page and handles user login process.
	"""
	if request.user.is_authenticated:
		return redirect('home')
	else:
		if request.method == 'POST':
			username = request.POST.get('username')
			password = request.POST.get('password')

			user = authenticate(request, username=username, password=password)

			if user is not None:
				login(request, user)
				return redirect('home')
			else:
				messages.info(request, 'Username OR password is incorrect')

		context = {}
		return render(request, 'accounts/login.html', context)


def logoutUser(request):
	"""
		This function handles user logout process.
		First this function clears the MEDIA directory and then it logout's the user.
	"""
	path2 = dirname(dirname(abspath(__file__))) + '\\MEDIA'
	if not os.path.exists(path2):
		os.makedirs(path2)
	else:
		shutil.rmtree(path2)           # Removes all the subdirectories
		os.makedirs(path2)
	logout(request)
	return redirect('login')


@login_required(login_url='login')
def home(request):
	"""
		This function render's the home page.
	"""
	return render(request, 'accounts/main.html')


@login_required(login_url='login')
def uploadfile(request):
	"""
		This function handles the file upload process.
	"""
	if request.method == "POST":
		request_file = request.FILES['document'] if 'document' in request.FILES else None
		if request_file:
			fs = FileSystemStorage()
			fs.save(request_file.name, request_file)
			return redirect('upload')

	return render(request, "accounts/upload.html")


@login_required(login_url='login')
def initate(request):
	"""
		This function initiate the algorithm to compare the files and saves the results in MEDIA directory.
	"""
	path2 = dirname(dirname(abspath(__file__))) + '\\MEDIA'
	command = ["python", str(dirname(abspath(__file__)))+"\\process.py"]
	if request.method == 'POST' and 'run_script' in request.POST:
		try:
			process = Popen(command, stdout=PIPE, stderr=STDOUT)
			exitstatus = process.poll()
			while(not os.path.exists(path2+"\\Results.zip")):
				i=1
			print('success')
			return redirect('upload')
		except Exception as e:
				print(e)
				return redirect('upload')

	return render(request, "accounts/process.html")
