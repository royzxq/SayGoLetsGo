# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import User, Group, TravelPlan, Place, TimeSpan
# Register your models here.

admin.site.register(User)
admin.site.register(Group)
admin.site.register(TravelPlan)
admin.site.register(Place)
admin.site.register(TimeSpan)