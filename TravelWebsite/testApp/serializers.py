from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Group, TravelPlan, Place, Activity, Profile, Expense

class ProfileSerializer(serializers.ModelSerializer):
    # user = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    # user = UserSerializer(many=False, read_only=False)
    class Meta:
        model = Profile
        fields = ('birth', 'gender')


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile')

class GroupSerializer(serializers.ModelSerializer):
    # onwer = serializers.ReadOnlyField(source='owner.title')
    # users = serializers.ManyH(User)
    # travel = serializers.RelatedField(many=False, read_only=True, source='travel.title')
    travelplan = serializers.SlugRelatedField(slug_field="title", queryset=TravelPlan.objects.all())
    # users = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Group
        fields = ('id', 'group_name', 'is_public', 'travelplan', )


class GroupCreateSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        print("Create group " + str(validated_data))
        # print("get context is " + str(self.context['manager_id']))
        group = Group.objects.create(
            group_name=validated_data['group_name'],
            # users=validated_data['users'],
            manager_id=validated_data['manager_id'],
            is_public=validated_data['is_public']
        )
        group.users.add(validated_data['users'])
        return group

    class Meta:
        model = Group
        fields = ('id', 'group_name', 'is_public', )


class GroupDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'group_name', 'manager_id', 'is_public', 'users')


class TravelSerializer(serializers.ModelSerializer):
    # group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all())
    group = serializers.SlugRelatedField(many=False, read_only=True, slug_field='group_name')
    # group = GroupSerializer(many=False, read_only=True)
    # group_name = group.group_name
    # group_name = serializers.SlugRelatedField(many=False, read_only=True, slug_field='group_name')
    class Meta:
        model = TravelPlan
        fields = ('id', 'title', 'group', 'days', 'country', )


class TravelCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelPlan
        fields = ('id', 'title', 'group', 'days', 'country', )


class PlaceSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    # user = serializers.SlugRelatedField(queryset=WebUser.objects.all(), slug_field='username')
    # user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Place
        fields = ('id', 'name', 'description', 'location', 'country', 'city', 'user', 'is_public')


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('user', 'expense', 'expense_activity')


class ActivityPlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('id', 'name')


class ActivitySerializer(serializers.ModelSerializer):
    # travel = serializers.PrimaryKeyRelatedField(queryset=TravelPlan.objects.all())
    # travel = TravelSerializer(many=False, read_only=True)
    travel = serializers.SlugRelatedField(many=False, read_only=True, slug_field='title')
    # place = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    place = ActivityPlaceSerializer(many=False, read_only=True)
    expense_activity = ExpenseSerializer(many=True, read_only=True)
    # expenses = serializers.SlugRelatedField(queryset=Expense.objects.all(), slug_field='expense')
    class Meta:
        model = Activity
        fields = ('id', 'start_time', 'duration', 'activity', 'note', 'travel', 'place', 'expense_activity')


class ActivityCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id', 'start_time', 'duration', 'activity', 'note', 'travel', 'place')