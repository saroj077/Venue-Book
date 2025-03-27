from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path('register/', views.UserProfileViewSet.as_view(), name='register'),
    path("userDetails/", views.ShowProfile.as_view(), name="user-detail"),
    path('userProfile/', views.get_user_profile,
         name='compare_username'),
]
