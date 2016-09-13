from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from donor.models import Profile, Request, Message
from donor.serializers import *

class User(viewsets.ModelViewSet):
    model = User
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Profile(viewsets.ModelViewSet):
    model = Profile
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class Request(viewsets.ModelViewSet):
    model = Request
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

class Message(viewsets.ModelViewSet):
    model = Message
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
