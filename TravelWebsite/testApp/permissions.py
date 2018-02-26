from rest_framework import permissions
from .models import getGroup




class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user



class IsGroupUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            if request.user in obj.traval.group.users.all():
                return True
            return False


class GroupUserReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
           return False
        return True
    def has_object_permission(self, request, view, obj):
        if request.method not in permissions.SAFE_METHODS:
            return False

        group = getGroup(obj)
        if request.user in group.users.all():
            return True
        return False

class GroupUserRW(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
           return False
    def has_object_permission(self, request, view, obj):
        group = getGroup(obj)
        if request.user in group.users.all():
            return True
        return False

class IsGroupCreator(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
           return False
    def has_object_permission(self, request, view, obj):
        group = getGroup(obj)
        if request.user.id == group.manager_id:
           return True
        return False