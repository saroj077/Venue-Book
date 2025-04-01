from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, UserProfile, Venue, Booking


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
    id = serializers.IntegerField(read_only=True)


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
        fields = ['id','username', 'email',
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
    venueownerid = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # If using ForeignKey

    class Meta:
        model = Venue
        fields = ['venueid', 'venuename', 'venueaddress', 'review', 'features', 'status', 'description', 'imageurl', 'venueownerid']


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"

    def validate(self, data):
        venue = data["venue"]
        start_date = data["start_date"]
        end_date = data["end_date"]

        # Check for conflicting bookings
        existing_booking = Booking.objects.filter(
            venue=venue,
            start_date__lte=end_date,
            end_date__gte=start_date
        ).exists()

        if existing_booking:
            raise serializers.ValidationError("This venue is already booked for the selected dates.")

        return data
