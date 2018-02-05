# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create your models here.

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class WebUser(models.Model):
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


# class UserGroup(models.Model):
#     user = models.ForeignKey(AbstractUser)
#     group = models.ForeignKey(Group)


class Group(models.Model):
    group_name = models.CharField("groupname", max_length=40)
    # group_manager = models.ForeignKey(User, on_delete=models.SET_NULL)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.group_name

    # def save(self, force_insert=False, force_update=False, using=None,
    #          update_fields=None):


class TravelPlan(models.Model):
    group = models.OneToOneField(Group, on_delete=models.CASCADE,)
    title = models.CharField("title", max_length=40, default="")
    country = models.CharField("country", max_length=20)
    days = models.IntegerField("days", default=1)
    modified_time = models.DateTimeField("modifiedtime", auto_now=True)

    def __str__(self):
        return self.title


class Place(models.Model):
    user = models.ForeignKey(WebUser, related_name='places', on_delete=models.CASCADE)
    name = models.CharField('name', max_length=100)
    description = models.CharField('description', max_length=200, default="")
    location = models.CharField('location', max_length=100, null=True)
    picture = models.ImageField('picture', max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super(Place, self).save(*args, **kwargs)


class TimeSpan(models.Model):
    travel = models.ForeignKey(TravelPlan, on_delete=models.CASCADE)
    start_time = models.DateTimeField("start_time")
    duration = models.DurationField("duration", null=True)
    activity_choice = (
        ("Traffic", "Traffic"),
        ("Meal", "Meal"),
        ("Sight seeing", "Sight seeing")
    )
    activity = models.CharField("activity", choices=activity_choice, max_length=30)
    note = models.CharField("note", max_length=200, null=True, blank=True)

    def __str__(self):
        return self.start_time.isoformat() + " " + self.activity


# class DayPlan(models.Model):
#     travel_plan = models.ForeignKey(TravelPlan)
#     date = models.DateField("date")
#     modified_time = models.DateTimeField("modifiedtime", auto_now=True)
#     city = models.CharField("city", max_length=20)
#     breakfast = models.CharField("breakfast", max_length=100)
#     lunch = models.CharField("lunch", max_length=100)
#     dinner = models.CharField('dinner', max_length=100)
#     places = models.CharField('locations', max_length=200, default="[]") # change this array to the JSonField
#
#     def addPlace(self, place):
#         places = self.getPlaces()
#         places.append(place.id)
#         self.places = json.dumps(places)
#
#     def getPlaces(self):
#         return json.loads(self.places)
#
#     def __str__(self):
#         return self.city + " " + self.date.isoformat()

