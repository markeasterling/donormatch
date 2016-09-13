from rest_framework import routers
from django.conf.urls import url, include
from donor import views

router = routers.DefaultRouter()
router.register(r'user', views.User)
router.register(r'profile', views.Profile)
router.register(r'request', views.Request)
router.register(r'message', views.Message)

urlpatterns = [
    url(r'^', include(router.urls)),
]