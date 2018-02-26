# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth = models.DateField('birth', null=True)
    gender_choices = (
            ("Male", "Male"),
            ("Female", "Female"),
            ("Dont want to tell", "Dont want to tell")
    )
    gender = models.CharField("gender", choices=gender_choices, max_length=30, null=True)
    photo = models.ImageField('photo', max_length=100, null=True, blank=True)

    def __str__(self):
        return self.user.username



class Group(models.Model):
    group_name = models.CharField("groupname", max_length=40)
    # group_manager = models.ForeignKey(User, on_delete=models.SET_NULL)
    users = models.ManyToManyField(User)
    manager_id = models.IntegerField("manager_id", default=-1)
    is_public = models.BooleanField('is_public', default=False)

    def __str__(self):
        return self.group_name



class TravelPlan(models.Model):
    group = models.OneToOneField(Group, on_delete=models.CASCADE, )
    title = models.CharField("title", max_length=40, default="")
    country = models.CharField("country", max_length=20)
    days = models.IntegerField("days", default=1)
    modified_time = models.DateTimeField("modifiedtime", auto_now=True)

    def __str__(self):
        return self.title


class Place(models.Model):
    user = models.ForeignKey(User, related_name='places', on_delete=models.CASCADE)
    travels = models.ManyToManyField(TravelPlan)
    name = models.CharField('name', max_length=100)
    description = models.CharField('description', max_length=200, default="")
    country = models.CharField('country', max_length=100, default="")
    city = models.CharField('city', max_length=100, default="")
    location = models.CharField('location', max_length=100, null=True)
    picture = models.ImageField('picture', max_length=100, null=True, blank=True)
    is_public = models.BooleanField('is_public', default=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super(Place, self).save(*args, **kwargs)


class Activity(models.Model):
    travel = models.ForeignKey(TravelPlan, on_delete=models.CASCADE)
    ## OPTIONAL RELY ON THE PLACE
    place = models.ForeignKey(Place, related_name='place', default=None, blank=True, null=True, on_delete=models.SET_DEFAULT)
    start_time = models.DateTimeField("start_time")
    duration = models.DurationField("duration", null=True, blank=True)
    activity_choice = (
        ("Traffic", "Traffic"),
        ("Meal", "Meal"),
        ("Sight seeing", "Sight seeing")
    )
    activity = models.CharField("activity", choices=activity_choice, max_length=30)
    note = models.CharField("note", max_length=200, null=True, blank=True)

    def __str__(self):
        return self.travel.title + " " + self.activity


class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expense = models.FloatField("expense", default=0.0)
    expense_activity = models.ForeignKey(Activity, related_name='expense_activity', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username + " paid " + str(self.expense)



def getGroup(obj):
    objType = type(obj)
    if objType is Group:
        return obj
