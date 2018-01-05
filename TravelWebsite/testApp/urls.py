from django.urls import path
from . import views
from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#
#         fields = ('url', 'username', 'email')
#
#
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
#
#
router = routers.DefaultRouter()
# router.register(r'users', UserSerializer)
router.register(r'places', views.PlaceViewSet)
router.register(r'timespans', views.TimespanViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'travels', views.TravelViewSet)

urlpatterns = [
    # path('user/register', views.register),
    # path('user/show', views.show),
    # path('user/update', views.update),
    # path('user/login', views.login),
    url(r'^', include(router.urls)),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]