# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import render, render_to_response
from rest_framework import viewsets
from rest_framework.views import APIView
# from .serializers import UserSerializer, User, ABUserSerializer, AbstractUser, TravelPlan, TravelSerializer, Place, PlaceSerializer
from .serializers import *
from rest_framework import status
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Group
from .serializers import GroupSerializer
from rest_framework.parsers import JSONParser
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly
# Create your views here.

def register(request):
    # return render(request, 'views/users/register.html')
    return HttpResponseRedirect('/admin/testApp/abstractuser/add')

def login(request):
    return render(request, 'views/users/login.html')

def update(request):
    return render(request, 'views/users/update.html')

def show(request):
    # return render(request, 'views/users/show.html')
    return HttpResponseRedirect('/admin/testApp/abstractuser')


def detail(request, id):
    return HttpResponse("THE ID IS %s" % id)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class ABUserViewSet(viewsets.ModelViewSet):
    queryset = AbstractUser.objects.all()
    serializer_class = ABUserSerializer


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(username=self.request.data['username'])


class TimespanViewSet(viewsets.ModelViewSet):
    queryset = TimeSpan.objects.all()
    serializer_class = TimeSpanSerializer



@api_view(['GET', 'POST'])
def group_list(request, format=None):
    if request.method == "GET":
        groups = Group.objects.all()
        serializer = GroupSerializer(groups, many=True, context={'request': request})
        return Response(serializer.data)


    if request.method== 'POST':
        data = JSONParser().parse(request)
        serializer = GroupSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=401)


class group_detail(APIView):
    def get(self, request, format=None):
        pass


    def post(self, request, format=None):
        pass


class group_list_api(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.travel)


class group_detail_api(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class tavel_list(generics.ListAPIView):
    queryset = TravelPlan.objects.all()
    serializer_class = TravelSerializer