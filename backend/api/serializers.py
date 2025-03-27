from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, UserProfile


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

    is_venue_owner = serializers.BooleanField(write_only=True)
    email = serializers.CharField(
        write_only=True, required=True)
    username = serializers.CharField(
        write_only=True, required=True)
    address = serializers.CharField(
        write_only=True, required=False)  # or TextField if needed
    phoneNumber = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = UserProfile
        fields = ['username', 'email',
                  'address', 'phoneNumber', 'is_venue_owner']
