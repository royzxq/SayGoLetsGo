from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Group, TravelPlan, Place, Activity, Profile

class ProfileSerializer(serializers.ModelSerializer):
    # user = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    # user = UserSerializer(many=False, read_only=False)
    class Meta:
        model = Profile
        fields = ('birth', 'gender')


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False, read_only=False)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile')

class GroupSerializer(serializers.ModelSerializer):
    # onwer = serializers.ReadOnlyField(source='owner.title')
    # users = serializers.ManyH(User)
    # travel = serializers.RelatedField(many=False, read_only=True, source='travel.title')
    # users = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Group
        fields = ('id', 'group_name', 'users', 'manager_id', 'is_public', )



class TravelSerializer(serializers.ModelSerializer):
    # group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all())
    group = serializers.SlugRelatedField(many=False, read_only=True, slug_field='group_name')
    # group = GroupSerializer(many=False, read_only=True)
    # group_name = group.group_name
    # group_name = serializers.SlugRelatedField(many=False, read_only=True, slug_field='group_name')
    class Meta:
        model = TravelPlan
        fields = ('id', 'title', 'group', 'days', 'country', )


class PlaceSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    # user = serializers.SlugRelatedField(queryset=WebUser.objects.all(), slug_field='username')
    # user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Place
        fields = ('id', 'name', 'description', 'location', 'user')


class ActivitySerializer(serializers.ModelSerializer):
    # travel = serializers.PrimaryKeyRelatedField(queryset=TravelPlan.objects.all())
    travel = TravelSerializer(many=False, read_only=True)
    class Meta:
        model = Activity
        fields = ('id', 'start_time', 'duration', 'activity', 'note', 'travel', 'expense', )