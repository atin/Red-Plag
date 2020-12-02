from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^user/get', GetUsers),
    url(r'^user/reg$', UserReg),
    url(r'^user/login', UserLogin),
    # url(r'^user/^(?=.{6,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$', UserApi),
]
