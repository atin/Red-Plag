from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^user/$', views.UserApi),
    url(r'^user/^(?=.{6,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$', views.UserApi)
]
