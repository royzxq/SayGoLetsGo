from rest_framework import permissions
from .models import getTravelGroup

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class TravelGroupUserReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
           return False
        return True
    def has_object_permission(self, request, view, obj):
        if request.method not in permissions.SAFE_METHODS:
            return False

        group = getTravelGroup(obj)
        if request.user in group.users.all():
            return True
        return False

class TravelGroupUserRW(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
           return False
        return True
    def has_object_permission(self, request, view, obj):
        group = getTravelGroup(obj)
        if request.user in group.users.all():
            return True
        return False

class IsTravelGroupCreator(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
           return False
        return True
    def has_object_permission(self, request, view, obj):
        group = getTravelGroup(obj)
        if request.user.id == group.manager_id:
           return True
        return False

class IsPost(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method == 'POST':
            return True
        return not request.user.is_anonymous

