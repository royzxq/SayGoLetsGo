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
        fields = ('id', 'title', 'users', 'is_public', 'country', 'days', 'modified_time')


class TravelGroupCreateSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        travelgroup = TravelGroup.objects.create(
            title=validated_data['title'],
            is_public=validated_data['is_public'],
            country=validated_data['country'],
            days=validated_data['days']
        )
        manager = validated_data['manager']
        Membership.objects.create(user=manager, travel_group=travelgroup, is_manager=True)
        return travelgroup

    class Meta:
        model = TravelGroup
        fields = ('title', 'is_public', 'country', 'days')


class TravelGroupListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelGroup
        fields = ('id', 'title', 'is_public', 'country', 'days')


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'


class PlaceSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    # user = serializers.SlugRelatedField(queryset=WebUser.objects.all(), slug_field='username')
    # user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Place
        fields = ('id', 'name', 'description', 'location', 'country', 'city', 'user', 'is_public')


class ExpenseCreateUpdateSerializer(serializers.ModelSerializer):

    def validate_paid2users(self, users):
        print(self.initial_data)
        travel_group_id = self.initial_data['travel_group']
        travel_group = TravelGroup.objects.get(pk=travel_group_id)
        group_users = travel_group.users.all()
        for user in users:
            if user not in group_users:
                raise serializers.ValidationError("User '" + str(user) + "' is not in travel group '" + str(travel_group) + "'")
        return users

    def create(self, validated_data):
        print('p1:' + str(validated_data))
        paid_user = validated_data['paid_user']
        print('p2:' + str(paid_user))
        print('p3:'+ str(validated_data['travel_group_id']))
        paid_member = paid_user.membership_set.get(travel_group__id=validated_data['travel_group_id'])
        print(str(paid_member))
        expense = Expense.objects.create(
            paid_member=paid_member,
            expense=validated_data['expense'],
            comment=validated_data['comment'],
        )
        expense.paid2users.set(validated_data['paid2users'])
        return expense

    def update(self, instance, validated_data):
        if instance.paid_member.user == self.request.user:
            instance.expense=validated_data['expense']
            instance.comment=validated_data['comment']
            instance.paid2users.set(validated_data['paid2users'])
            instance.save()
        return instance

    class Meta:
        model = Expense
        fields = ('expense', 'paid2users', 'comment', )


class ExpenseSerializer(serializers.ModelSerializer):
    paid_member = MembershipSerializer(many=False, read_only=True)

    class Meta:
        model = Expense
        fields = ('id', 'paid2users', 'expense', 'comment', 'paid_member')

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        paid_member = ret['paid_member']
        if paid_member != None:
            ret['paid_user'] = paid_member['user']
        else:
            ret['paid_user'] = None
        ret.pop('paid_member')
        return ret


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