from django.urls import path
from . import views

urlpatterns = [
    path('user/register', views.register),
    path('user/show', views.show),
    path('user/update', views.update),
    path('user/login', views.login),
]