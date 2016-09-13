from rest_framework import serializers
from django.contrib.auth.models import User
from donor.models import Profile, Request, Message

class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'date_joined')


class ProfileSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Profile
        fields = ('user', 'category', 'informationNumber', 'address', 'phone')

class RequestSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Request
        fields = ('creator', 'category', 'grouping', 'name', 'description', 'start', 'end', 'email', 'phone')

class MessageSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Message
        fields = ('sender', 'recipient', 'text', 'created')
