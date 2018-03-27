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


class TravelGroup(models.Model):
    title = models.CharField("title", max_length=40, default="")
    users = models.ManyToManyField(User, through='Membership')
    #manager_id = models.IntegerField("manager_id", default=-1)
    is_public = models.BooleanField('is_public', default=False)
    country = models.CharField("country", max_length=20)
    days = models.IntegerField("days", default=1)
    modified_time = models.DateTimeField("modifiedtime", auto_now=True)

    def __str__(self):
        return self.title


class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    travel_group = models.ForeignKey(TravelGroup, on_delete=models.CASCADE)
    is_manager = models.BooleanField('is_manager', default=False)
    is_creator = models.BooleanField('is_creator', default=False)
    #balance = models.FloatField("balance", default=0.0)
    class Meta:
        unique_together = (('user', 'travel_group'),)

    def __str__(self):
        return "membership: '" + self.user.__str__() + "' in '" + self.travel_group.__str__() + "'"


class Place(models.Model):
    user = models.ForeignKey(User, related_name='places', on_delete=models.CASCADE)
    travels = models.ManyToManyField(TravelGroup, blank=True)
    name = models.CharField('name', max_length=100)
    description = models.CharField('description', max_length=200, default="")
    country = models.CharField('country', max_length=100, default="")
    city = models.CharField('city', max_length=100, default="")
    location = models.CharField('location', max_length=100, null=True, blank=True)
    picture = models.ImageField('picture', max_length=100, null=True, blank=True)
    is_public = models.BooleanField('is_public', default=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super(Place, self).save(*args, **kwargs)


class Activity(models.Model):
    travel = models.ForeignKey(TravelGroup, on_delete=models.CASCADE)
    ## OPTIONAL RELY ON THE PLACE
    place = models.ForeignKey(Place, related_name='place', default=None, blank=True, null=True, on_delete=models.SET_DEFAULT)
    start_time = models.DateTimeField("start_time")
    duration = models.DurationField("duration", null=True, blank=True) # may remove from this table
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
    payees = models.ManyToManyField(User)
    expense = models.FloatField("expense", default=0.0)
    paid_member = models.ForeignKey(Membership, on_delete=models.CASCADE, null=True)
    comment = models.CharField('comment', max_length=128, null=True, blank=True)
    note = models.CharField('note', max_length=100, null=True, blank=True)

    def __str__(self):
        return "Expense: " + str(self.expense)


def get_travel_group(obj):
    obj_type = type(obj)
    if obj_type is TravelGroup:
        return obj
    if obj_type is Expense:
        return obj.paid_member.travel_group

    if obj_type is Membership:
        return obj.travel_group

    if obj_type is Activity:
        return obj.travel_group
