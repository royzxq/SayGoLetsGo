from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class ProfileSerializer(serializers.ModelSerializer):
    # user = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    # user = UserSerializer(many=False, read_only=False)
    class Meta:
        model = Profile
        fields = ('birth', 'gender')


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile')


class ExpensePayeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', )


class TravelExpenseSerializer(serializers.ModelSerializer):
    payee = ExpensePayeeSerializer(many=True)
    class Meta:
        model = Expense
        fields = ('payer_id', 'expense', 'payee')


class TravelGroupDetailSerializer(serializers.ModelSerializer):
    expense_set = TravelExpenseSerializer(many=True)
    class Meta:
        model = TravelGroup
        fields = ('id', 'title', 'users', 'is_public', 'country', 'days', 'manager_id', 'modified_time', 'expense_set')


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
            travel=validated_data['travel'],
            # payee=validated_data['payee'],
            payer_id=validated_data['payer'],
            expense=validated_data['expense'],
        )
        expense.payee.set(validated_data['payee'])
        return expense

    class Meta:
        model = Expense
        fields = ('expense', 'travel', 'payee')


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('payer_id', 'expense', 'payee', 'travel')


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
    # expenses = serializers.SlugRelatedField(queryset=Expense.objects.all(), slug_field='expense')
    class Meta:
        model = Activity
        fields = ('id', 'start_time', 'duration', 'activity', 'note', 'travel', 'place', )


class ActivityCreateSerializer(serializers.ModelSerializer):
    # def create(self, validated_data):
    #     print(validated_data)

    class Meta:
        model = Activity
        fields = ('id', 'start_time', 'activity', 'note', 'travel', 'place')