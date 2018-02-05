# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import render, render_to_response
from rest_framework import viewsets
from rest_framework.views import APIView
from .serializers import *
from rest_framework import status
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions, authentication
from .permissions import IsOwnerOrReadOnly, IsGroupUser
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
import datetime
from django.conf import settings
# import pdb; pdb.set_trace()
from rest_framework.authtoken.views import ObtainAuthToken
from oauth2_provider.contrib.rest_framework import TokenHasScope
# Create your views here.


EXPIRE_MINUTES = getattr(settings, 'REST_FRAMEWORK_TOKEN_EXPIRE_MINUTES', 1)


class ObtainExpiringAuthToken(ObtainAuthToken):
    """Create user token"""
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        token, created = Token.objects.get_or_create(user=serializer.validated_data['user'])
        timezone = token.created.tzinfo;
        now = datetime.datetime.now()
        now = now.replace(tzinfo=timezone)
        expiration = now-datetime.timedelta(minutes=EXPIRE_MINUTES)
        if created or token.created < expiration:
            # Update the created time of the token to keep it valid
            token.delete()
            token = Token.objects.create(user=serializer.validated_data['user'])
            token.created = now
            token.save()
        return Response({'token': token.key})


obtain_expiring_auth_token = ObtainExpiringAuthToken.as_view()

def index(request):
    context = {
        'days': [1, 2, 3],
    }
    return render(request, 'index.html')

def register(request):
    # return render(request, 'views/users/register.html')
    return HttpResponseRedirect('/admin/testApp/abstractuser/add')

class SessionLoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        print('request data =', request.data)
        username = request.data['username']
        password = request.data['password']
        print(0, username, password)
        user = authenticate(username=username, password=password)
        print(1)
        if user is not None:
            print(2)
            if user.is_active:
                print(3)
                login(request, user)
                print(4)
                return Response('logged on')
        return Response('fail!')

def update(request):
    return render(request, 'views/users/update.html')

def show(request):
    # return render(request, 'views/users/show.html')
    return HttpResponseRedirect('/admin/testApp/abstractuser')


def detail(request, id):
    return HttpResponse("THE ID IS %s" % id)


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    #permission_classes = (permissions.IsAuthenticated, TokenHasScope)
    #authentication_classes = (authentication.TokenAuthentication,)
    #authentication_classes = (authentication.SessionAuthentication,)

    #required_scopes = ('places'),

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TimespanViewSet(viewsets.ModelViewSet):
    queryset = TimeSpan.objects.all()
    serializer_class = TimeSpanSerializer
    permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsGroupUser)
    #
    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class TravelViewSet(viewsets.ModelViewSet):
    queryset = TravelPlan.objects.all()
    serializer_class = TravelSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = WebUser.objects.all()
    serializer_class = WebUserSerializer

