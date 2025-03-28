from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, UserProfile, Venue


class showProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
        ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}


class UserSerializers(serializers.ModelSerializer):

    is_venue_owner = serializers.BooleanField()
    email = serializers.CharField(
        required=True)
    username = serializers.CharField(
        required=True)
    address = serializers.CharField(
        required=False)  # or TextField if needed
    phoneNumber = serializers.CharField(required=False)

    class Meta:
        model = UserProfile
        fields = ['username', 'email',
                  'address', 'phoneNumber', 'is_venue_owner']




class VenueSerializer(serializers.ModelSerializer):
    venueid = serializers.IntegerField(read_only=True)
    venuename = serializers.CharField(required=True)
    venueaddress = serializers.CharField(required=True)
    review = serializers.CharField(required=False)
    features = serializers.CharField(required=False)
    status = serializers.BooleanField(default=True)
    description = serializers.CharField(required=False)
    imageurl = serializers.JSONField(required=False)  # Allows storing a JSON array of image URLs

    class Meta:
        model = Venue
        fields = ['venueid', 'venuename', 'venueaddress', 'review', 'features', 'status', 'description', 'imageurl']
