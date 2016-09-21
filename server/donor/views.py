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
    print("REQUEST BODY!!!!", request_body)

    authenticated_user = authenticate(
            username=request_body['username'],
            password=request_body['password']
            )

    success = True
    if authenticated_user is not None:
        login(request=request, user=authenticated_user)
        print("request user", request.user.id)

    else:
        success = False

    # data = json.dumps({"success":success})
    data = json.dumps({"userId":request.user.id,
                       "username": request.user.username
                        })
    return HttpResponse(data, content_type='application/json')

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

# @csrf_exempt
# def testPost(request):
#     data = json.loads(request.body.decode("utf-8"))
#     print(data)
#
#     return HttpResponse(status=200)

@csrf_exempt
def postNewListing(request):
    print("it's talking to django")
    data = json.loads(request.body.decode("utf-8"))
    creatorP = data["creator"]
    categoryP = data["category"]
    groupingP = data["grouping"]
    nameP = data["name"]
    descriptionP = data["description"]
    endP = data["end"]
    emailP = data["email"]
    phoneP = data["phone"]
    print("this here's the data", data)

    listing_object = Request(creator=User.objects.get(pk=int(creatorP)),
                             category=categoryP,
                             grouping=groupingP,
                             name=nameP,
                             description=descriptionP,
                             end=endP,
                             email=emailP,
                             phone=phoneP)
    print("listing",listing_object)
    listing_object.save()
    return HttpResponse(status=200)

@csrf_exempt
def post_profile_info(request):
    print("request is interfacing")
    data = json.loads(request.body.decode("utf-8"))
    print("DATA DATA ATA DATA DATA", data)

    profile_object = Profile(user=User.objects.get(pk=int(data["user"])),
                             category=data["category"],
                             informationNumber=data["EIN"],
                             address=data["address"],
                             phone=data["phone"])
    print("profile obj", profile_object)
    profile_object.save()
    return HttpResponse(status=200)

@csrf_exempt
def send_message(request):
    print('request is interfacing')
    data = json.loads(request.body.decode("utf-8"))
    print('DAT DATA, DOE', data)

    message_object = Message(sender=User.objects.get(pk=int(data["sender"])),
                             recipient=User.objects.get(pk=int(data["sender"])),
                             text=data["text"])
    print("MSG OBJECT", message_object)
    message_object.save()
    return HttpResponse(status=200)

@csrf_exempt
def get_messages(request):
    data = json.loads(request.body.decode("utf-8"))
    print("HERES THE DATA_-----------------------", data)
    message_object = Message.objects.filter(
        Q(sender=int(data["user"])) | Q(recipient=int(data["user"]))
    ).values()
    # message_object.save()

    data = json.dumps(list(message_object), cls=DjangoJSONEncoder)
    return HttpResponse(data, content_type="application/json")
