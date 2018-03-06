from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

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


class TravelGroupDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelGroup
        fields = ('id', 'title', 'users', 'is_public', 'country', 'days', 'manager_id', 'modified_time')


class TravelGroupCreateSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        travelgroup = TravelGroup.objects.create(
            title=validated_data['title'],
            manager_id=validated_data['manager_id'],
            is_public=validated_data['is_public'],
            country=validated_data['country'],
            days=validated_data['days']
        )
        travelgroup.users.add(validated_data['manager_id'])
        return travelgroup

    class Meta:
        model = TravelGroup
        fields = ('title', 'is_public', 'country', 'days')


class TravelGroupListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelGroup
        fields = ('id', 'title', 'is_public', 'country', 'days')


class PlaceSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    # user = serializers.SlugRelatedField(queryset=WebUser.objects.all(), slug_field='username')
    # user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Place
        fields = ('id', 'name', 'description', 'location', 'country', 'city', 'user', 'is_public')


class ExpenseCreateSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        expense = Expense.objects.create(
            expense_activity=validated_data['expense_activity'],
            user=validated_data['user'],
            expense=validated_data['expense'],
        )
        print(str(validated_data))
        return expense

    class Meta:
        model = Expense
        fields = ('expense', 'expense_activity')


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
    # def create(self, validated_data):
    #     print(validated_data)

    class Meta:
        model = Activity
        fields = ('id', 'start_time', 'activity', 'note', 'travel', 'place')