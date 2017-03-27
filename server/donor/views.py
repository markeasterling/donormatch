from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from django.contrib.auth import logout, login, authenticate
from django.core import serializers
from donor.models import Profile, Request, Message
from donor.serializers import UserSerializer, ProfileSerializer, RequestSerializer, MessageSerializer
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
import json
from django.core.serializers.json import DjangoJSONEncoder

class UserObject(viewsets.ModelViewSet):
    model = User
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):

        queryset = User.objects.all()
        username = self.request.query_params.get('username')
        if username is not None:
            queryset = queryset.filter(username=username)
        return queryset

class ProfileObject(viewsets.ModelViewSet):
    model = Profile
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class RequestObject(viewsets.ModelViewSet):
    model = Request
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

class MessageObject(viewsets.ModelViewSet):
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

    data = json.dumps({"userId":request.user.id,
                       "username": request.user.username
                        })
    return HttpResponse(data, content_type='application/json')

@csrf_exempt
def logout_user(request):
    logout(request)
    return HttpResponse(status=200)

@csrf_exempt
def request_categories(request):
    data = json.dumps(RequestObject.model.CATEGORY_CHOICES)
    return HttpResponse(data, content_type="application/json")

@csrf_exempt
def request_grouping(request):
    data = json.dumps(RequestObject.model.GROUPING_CHOICES)
    return HttpResponse(data, content_type="application/json")

@csrf_exempt
def request_profile_choices(request):
    data = json.dumps(ProfileObject.model.CATEGORY_CHOICES)
    return HttpResponse(data, content_type="application/json")

@csrf_exempt
def postNewListing(request):
    data = json.loads(request.body.decode("utf-8"))
    creatorP = data["creator"]
    categoryP = data["category"]
    groupingP = data["grouping"]
    nameP = data["name"]
    descriptionP = data["description"]
    endP = data["end"]
    emailP = data["email"]
    phoneP = data["phone"]

    listing_object = Request(creator=User.objects.get(pk=int(creatorP)),
                             category=categoryP,
                             grouping=groupingP,
                             name=nameP,
                             description=descriptionP,
                             end=endP,
                             email=emailP,
                             phone=phoneP)
    listing_object.save()
    return HttpResponse(status=200)

@csrf_exempt
def post_profile_info(request):
    data = json.loads(request.body.decode("utf-8"))

    profile_object = Profile(user=User.objects.get(pk=int(data["user"])),
                             category=data["category"],
                             informationNumber=data["EIN"],
                             address=data["address"],
                             phone=data["phone"])
    profile_object.save()
    return HttpResponse(status=200)

@csrf_exempt
def send_message(request):
    data = json.loads(request.body.decode("utf-8"))

    message_object = Message(sender=User.objects.get(pk=int(data["sender"])),
                             recipient=User.objects.get(pk=int(data["recipient"])),
                             text=data["text"])
    message_object.save()
    return HttpResponse(status=200)

@csrf_exempt
def get_messages(request):
    data = json.loads(request.body.decode("utf-8"))
    message_object = Message.objects.filter(
        Q(sender=int(data["user"])) | Q(recipient=int(data["user"]))).values()
    data = json.dumps(list(message_object), cls=DjangoJSONEncoder)
    return HttpResponse(data, content_type="application/json")
