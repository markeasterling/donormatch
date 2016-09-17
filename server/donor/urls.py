from rest_framework import routers
from django.conf.urls import url, include
from donor import views

router = routers.DefaultRouter()
router.register(r'user', views.UserObject)
router.register(r'profile', views.Profile)
router.register(r'request', views.Request)
router.register(r'message', views.Message)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^register$', views.register_user, name='register_user'),
    url(r'^login$', views.login_user, name='login'),
]
