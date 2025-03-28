from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title


class UserProfile(models.Model):
    username = models.TextField(blank=True, null=True)
    email = models.EmailField(max_length=254, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    phoneNumber = models.BigIntegerField(blank=True, null=True)
    is_venue_owner = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


from django.db import models

class Venue(models.Model):
    venueid = models.AutoField(primary_key=True)  # Assuming venueid is the primary key
    venuename = models.CharField(max_length=255)
    venueaddress = models.CharField(max_length=255)
    review = models.TextField()
    features = models.TextField()  # Store comma-separated or detailed features as a string
    status = models.BooleanField(default=True)
    description = models.TextField()
    imageurl = models.JSONField()  # Requires PostgreSQL JSON type compatibility

    class Meta:
        db_table = 'venue'  # Explicitly map to the 'venue' table in the database
        managed = True 

    def __str__(self):
        return self.venuename
