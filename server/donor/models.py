from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User)
    category = models.CharField(max_length=75)
    informationNumber = models.CharField(max_length=75, blank=True)
    address = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=75, blank=True)

class Request(models.Model):
    REQUEST = 'request'
    OFFER = 'offer'
    GROUPING_CHOICES = (
        (REQUEST, 'request'),
        (OFFER, 'offer'),
    )
    HEALTH = 'health'
    DURABLE = 'durable'
    PERISHABLE = 'perishable'
    NONPERISHABLE = 'nonperishable'
    CATEGORY_CHOICES = (
        ('health', 'health/first aid'),
        ('durable', 'durable goods'),
        ('nondurable', 'non-durable goods'),
        ('perishable', 'perishable food items'),
        ('nonperishable', 'non-perishable food items'),
        ('volunteer', 'volunteer services'),
    )


    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=75, blank=True, choices=CATEGORY_CHOICES)
    grouping = models.CharField(max_length=10, blank=True, choices=GROUPING_CHOICES)
    name = models.CharField(max_length=75)
    description = models.CharField(max_length=1000)
    start = models.DateTimeField(auto_now_add=True)
    end = models.DateTimeField()
    email = models.CharField(max_length=75, blank=True)
    phone = models.CharField(max_length=75, blank=True)

class Message(models.Model):
    sender = models.ForeignKey(User, related_name="sender")
    recipient = models.ForeignKey(User, related_name="recipient")
    text = models.CharField(max_length=1000)
    created = models.DateTimeField(auto_now_add=True)
