from django.urls import path
from . import views

urlpatterns = [
    path('post/', views.post, name='post'),
    path('get/', views.get, name='get'),
    path('getTags/', views.getTags, name='getTags'),
]