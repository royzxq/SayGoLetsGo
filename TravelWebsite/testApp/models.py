# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser, BaseUserManager
# Create your models here.


class UserManger(BaseUserManager):
    def create_user(self, username, firstname, lastname, email, birth, password=None, gender=None):
        self.check_required_filled(username, firstname, lastname, email, birth)
        user = self.model(email=self.normalize_email(email), username=username, firstname=firstname, lastname=lastname, birth=birth, gender=gender)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def check_required_filled(self, username, firstname, lastname, email, birth):
        if not username:
            raise ValueError("username required")
        if not firstname or not lastname:
            raise ValueError("first and last name required")
        if not email:
            raise ValueError("email required")
        if not birth:
            raise ValueError("birth required")


class AbstractUser(AbstractBaseUser):
    username = models.CharField("username", max_length=20, unique=True)
    firstname = models.CharField("firstname", max_length=20, default="")
    lastname = models.CharField("lastname", max_length=20, default="")
    email = models.EmailField("email", max_length=40, unique=True)
    password = models.CharField("password", max_length=20)
    birth = models.DateField('birth')
    gender_choices = (
        ("Male", "Male"),
        ("Female", "Female"),
        ("Dont want to tell", "Dont want to tell")
    )
    gender = models.CharField("gender", choices=gender_choices, max_length=30, default="Male")
    objects = UserManger()
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username

    def get_email_name(self):
        return self.email


class User(models.Model):
    user_name = models.CharField("username", primary_key=True, max_length=20)
    birthday = models.DateField("birth")
    register_time = models.DateField("regittime", auto_now_add=True)
    first_name = models.CharField("firstname", max_length=20)
    last_name = models.CharField("lastname", max_length=20)
    gender_choices = (
        ("Male", "Male"),
        ("Female", "Female"),
        ("Dont want to tell", "Dont want to tell")
    )
    gender = models.CharField("gender", choices=gender_choices, max_length=30)
    photo = models.ImageField("photo", max_length=100, null=True, blank=True)
    password = models.CharField("password", max_length=20)
    email = models.EmailField("email", max_length=40)

    def __str__(self):
        return self.user_name


class Group(models.Model):
    group_name = models.CharField("groupname", max_length=40)
    group_manager = User
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.group_name


class TravelPlan(models.Model):
    group = models.OneToOneField(Group, on_delete=models.CASCADE,)
    title = models.CharField("title", max_length=40, default="")
    country = models.CharField("country", max_length=20)
    days = models.IntegerField("days", default=1)
    modified_time = models.DateTimeField("modifiedtime", auto_now=True)

    def __str__(self):
        return self.title


class Place(models.Model):
    name = models.CharField('name', max_length=100)
    description = models.CharField('description', max_length=200, default="")
    location = models.CharField('location', max_length=100, null=True)
    picture = models.ImageField('picture', max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


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
    note = models.CharField("note", max_length=200, null=True)

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

