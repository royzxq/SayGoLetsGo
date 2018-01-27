from django.urls import path
from . import views
from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets
from rest_framework.authtoken import views as rest_framework_views
#from django.views.decorators.csrf import csrf_exempt


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
    #url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('user/login/', views.SessionLoginView.as_view()),
    url(r'^', include(router.urls)),
    #url(r'^user/get_auth_token/$', rest_framework_views.obtain_auth_token, name='get_auth_token'),
    url(r'^user/get_auth_token/$', views.obtain_expiring_auth_token, name='get_auth_token'),
]