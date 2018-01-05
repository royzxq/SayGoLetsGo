from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Group, TravelPlan, Place, TimeSpan


class GroupSerializer(serializers.ModelSerializer):
    # onwer = serializers.ReadOnlyField(source='owner.title')
    # users = serializers.ManyH(User)
    class Meta:
        model = Group
        fields = ('id', 'group_name', 'users', )


class TravelSerializer(serializers.ModelSerializer):
    # group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all())
    class Meta:
        model = TravelPlan
        fields = ('id', 'title', 'group', 'days', 'country')


class PlaceSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    # user = serializers.SlugRelatedField(queryset=WebUser.objects.all(), slug_field='username')
    # user_serilize = WebUserSerializer
    class Meta:
        model = Place
        fields = ('id', 'name', 'description', 'location')


class TimeSpanSerializer(serializers.ModelSerializer):
    # travel = serializers.PrimaryKeyRelatedField(queryset=TravelPlan.objects.all())
    class Meta:
        model = TimeSpan
        fields = ('id', 'start_time', 'duration', 'activity', 'note')