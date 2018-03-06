# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, render_to_response
from rest_framework import viewsets, filters
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import permissions, authentication
from .permissions import IsOwnerOrReadOnly, IsGroupUser, IsPost
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
import datetime
from django.conf import settings
from rest_framework.authtoken.views import ObtainAuthToken
from filters.mixins import FiltersMixin
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

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


class PlaceViewSet(FiltersMixin, viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    pagination_class = PageNumberPagination
    filter_backends = (filters.OrderingFilter, )
    ordering_fields = ('user', 'country', 'city')
    ordering = ('user', 'country', 'city')

    filter_mappings = {
        'user': 'user',
        'country': 'country',
        'city': 'city',
        'travels': 'travels',
    }

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.id)

    def get_queryset(self):
        query_params = self.request.query_params
        url_params = self.kwargs

        queryset_filters = self.get_db_filters(url_params=url_params, query_params=query_params)
        db_filters = queryset_filters['db_filters']
        db_excludes = queryset_filters['db_excludes']

        if not self.request.user.is_anonymous and not query_params.dict():
            queryset = Place.objects.filter(Q(user=self.request.user.id) | Q(is_public=True))
        else:
            queryset = Place.objects.all()
        if('search' in query_params):
            return queryset.filter(name__contains=query_params['search']).exclude(**db_excludes)
        return queryset.filter(**db_filters).exclude(**db_excludes)


class ActivityViewSet(FiltersMixin, viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsGroupUser)
    filter_backends = (filters.OrderingFilter, )
    ordering_fields = ('start_time', 'travel', )
    ordering = ('start_time', 'travel', )

    filter_mappings = {
        'travel': 'travel',
    }
    def create(self, request, *args, **kwargs):
        self.serializer_class = ActivityCreateSerializer
        return viewsets.ModelViewSet.create(self, request,  *args, **kwargs)


class TravelGroupViewSet(FiltersMixin, viewsets.ModelViewSet):
    serializer_class = TravelGroupListSerializer # default is to get the list
    filter_backends = (filters.OrderingFilter, )
    ordering_fields = ('is_public', 'title', 'manager_id',)
    ordering = ('is_public', 'title', 'manager_id', )

    filter_mappings = {
        'title': 'title',
        'manager_id': 'manager_id',
        'is_public': 'is_public',
    }

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = TravelGroupDetailSerializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        self.serializer_class = TravelGroupCreateSerializer
        return viewsets.ModelViewSet.create(self, request,  *args, **kwargs)

    def perform_create(self, serializer):
        if not self.request.user.is_anonymous:
            serializer.save(manager_id=self.request.user.id)

    def get_queryset(self):
        query_params = self.request.query_params
        url_params = self.kwargs

        queryset_filters = self.get_db_filters(url_params=url_params, query_params=query_params)
        db_filters = queryset_filters['db_filters']
        db_excludes = queryset_filters['db_excludes']

        if not self.request.user.is_anonymous and not query_params.dict():
            queryset = User.objects.get(id=self.request.user.id).travelgroup_set.all()
        else:
            queryset = TravelGroup.objects.all()

        if('search' in query_params):
            return queryset.filter(title__contains=query_params['search']).exclude(**db_excludes)
        return queryset.filter(**db_filters).exclude(**db_excludes)


class UserViewSet(FiltersMixin, viewsets.ModelViewSet):

    serializer_class = UserSerializer
    filter_backends = (filters.OrderingFilter, )
    ordering_fields = ( 'username', 'email', )
    ordering = ( 'username', 'email',)
    filter_mappings = {
        # 'user_id': 'user_id',
        'username': 'username',
        'email': 'email',
    }
    permission_classes = (IsPost,)

    def get_queryset(self):
        query_params = self.request.query_params
        url_params = self.kwargs
        queryset_filters = self.get_db_filters(url_params=url_params, query_params=query_params)
        db_filters = queryset_filters['db_filters']
        db_excludes = queryset_filters['db_excludes']
        queryset = User.objects.all()
        if('search' in query_params):
            return queryset.filter(username__contains=query_params['search']).exclude(**db_excludes)

        return queryset.filter(**db_filters).exclude(**db_excludes)


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def perform_create(self, serializer):
        if not self.request.user.is_anonymous:
            serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        self.serializer_class = ExpenseCreateSerializer
        return viewsets.ModelViewSet.create(self, request,  *args, **kwargs)

    permission_classes = (permissions.AllowAny, )
