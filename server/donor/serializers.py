from rest_framework import serializers
from django.contrib.auth.models import User
from donor.models import Profile, Request, Message

class RequestSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Request
        fields = ('creator', 'category', 'grouping', 'name', 'description', 'start', 'end', 'email', 'phone')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    request_set = RequestSerializer(many=True)
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'date_joined', 'request_set')


class ProfileSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Profile
        fields = ('user', 'category', 'informationNumber', 'address', 'phone')


class MessageSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Message
        fields = ('sender', 'recipient', 'text', 'created')
