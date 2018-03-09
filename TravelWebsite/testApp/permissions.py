from rest_framework import permissions
from .models import *

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class TravelGroupUserReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method not in permissions.SAFE_METHODS:
            return False
        if request.user.is_anonymous:
           return False
        return True
    def has_object_permission(self, request, view, obj):
        if request.method not in permissions.SAFE_METHODS:
            return False

        group = get_travel_group(obj)
        if request.user in group.users.all():
            return True
        return False


class TravelGroupUserRW(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
           return False

        if request.method == 'POST':
            data = request.data
            group = request.data.get('travel_group', None)
            if group is None:
                return False
            group = TravelGroup.objects.get(pk=group)
            membership = group.membership_set.filter(user=request.user).all()
            if len(membership) == 0:
                return False
        return True

    def has_object_permission(self, request, view, obj):
        group = get_travel_group(obj)
        if request.user in group.users.all():
            return True
        return False


class IsTravelGroupCreator(permissions.BasePermission):
    def has_permission(self, request, view):
        print('data: ')
        print(request.method)
        if request.user.is_anonymous:
           return False

        if request.method == 'POST':
            data = request.data
            group = request.data.get('travel_group', None)
            if group is None:
                return False
            group = TravelGroup.objects.get(pk=group)
            membership = group.membership_set.filter(user=request.user).all()
            if len(membership) == 0:
                return False
            return membership[0].is_manager is True
        return True

    def has_object_permission(self, request, view, obj):
        group = get_travel_group(obj)
        membership = group.membership_set.get(user=request.user)
        if membership.is_manager is True:
            return True
        return False

class IsPost(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method == 'POST':
            return True
        return not request.user.is_anonymous

