from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from django.contrib.auth import logout, login, authenticate
from donor.models import Profile, Request, Message
from donor.serializers import UserSerializer, ProfileSerializer, RequestSerializer, MessageSerializer
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.views.decorators.csrf import csrf_exempt
import json

class UserObject(viewsets.ModelViewSet):
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

@csrf_exempt
def register_user(request):
    request_body = json.loads(request.body.decode())

    new_user = User.objects.create_user(
                    username=request_body['username'],
                    password=request_body['password'],
                    email=request_body['email'],
                    )

    new_user.save()

    return login_user(request)

@csrf_exempt
def login_user(request):
    request_body = json.loads(request.body.decode())

    authenticated_user = authenticate(
            username=request_body['username'],
            password=request_body['password']
            )

    success = True
    if authenticated_user is not None:
        login(request=request, user=authenticated_user)
    else:
        success = False

    data = json.dumps({"success":success})
    return HttpResponse(data, content_type='application/json')
