from django.conf.urls import url
from User import views

urlpatterns = [
    url(r'^user/$', views.UserApi),
    url(r'^user/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$', views.UserApi)
]
