from django.contrib.auth.models import User
from rest_framework import serializers
from .models import AbstractUser, Group, TravelPlan, Place, TimeSpan

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')



class ABUserSerializer(serializers.HyperlinkedModelSerializer):
    places = serializers.HyperlinkedRelatedField(view_name='place-detial', queryset=Place.objects.all())
    class Meta:
        model = AbstractUser
        fields = ('url', 'username', 'birth')


class GroupSerializer(serializers.ModelSerializer):
    onwer = serializers.ReadOnlyField(source='owner.title')
    class Meta:
        model = Group
        fields = ('id', 'group_name', 'owner', )


class TravelSerializer(serializers.Serializer):
    group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all())
    class Meta:
        model = TravelPlan
        fields = ('title', 'group', 'day', 'country')


class PlaceSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    user = serializers.SlugRelatedField(queryset=AbstractUser.objects.all(), slug_field='username')
    class Meta:
        model = Place
        fields = ('id', 'user', 'name', 'description', 'location')


class TimeSpanSerializer(serializers.ModelSerializer):
    travel = serializers.PrimaryKeyRelatedField(queryset=TravelPlan.objects.all())
    class Meta:
        model = TimeSpan
        fields = ('id', 'start_time', 'duration', 'activity', 'note', 'travel')