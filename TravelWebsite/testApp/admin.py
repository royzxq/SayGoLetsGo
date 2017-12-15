# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Group, TravelPlan, Place, TimeSpan, AbstractUser
from .forms import RegisterForm
# Register your models here.


class AbstractUserAdmin(BaseUserAdmin):
    form = RegisterForm
    add_form = RegisterForm
    list_display = ('username', 'firstname', 'lastname', 'email', 'birth', 'gender', )
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'firstname', 'lastname', 'birth', 'gender', )}),
        ('Personal info', {'fields': ()}),
    )
    list_filter = ('username',)
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'firstname', 'lastname', 'birth', 'email', 'gender', 'password1', 'password2')}
        ),
    )
    filter_horizontal = ()
    ordering = ('username', 'email', )


admin.site.register(User)
admin.site.register(Group)
admin.site.register(TravelPlan)
admin.site.register(Place)
admin.site.register(TimeSpan)
admin.site.register(AbstractUser, AbstractUserAdmin)