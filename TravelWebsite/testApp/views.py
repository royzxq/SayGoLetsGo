# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render, render_to_response

from .models import User

# Create your views here.

def register(request):
    return render(request, 'views/users/register.html')


def login(request):
    return render(request, 'views/users/login.html')

def update(request):
    return render(request, 'views/users/update.html')


def show(request):
    return render(request, 'views/users/show.html')

