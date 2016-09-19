from rest_framework import routers
from django.conf.urls import url, include
from donor import views

router = routers.DefaultRouter()
router.register(r'user', views.UserObject)
router.register(r'profile', views.Profile)
router.register(r'request', views.RequestObject)
router.register(r'message', views.Message)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^register$', views.register_user, name='register_user'),
    url(r'^login$', views.login_user, name='login'),
    url(r'^get_request_categories$', views.request_categories, name='get_request_categories'),
    url(r'^get_grouping_choices$', views.request_grouping, name='get_grouping_choices'),
    url(r'^post_new_listing$', views.postNewListing, name="post_new_listing"),
    url(r'^test$', views.testPost, name="test"),

]
