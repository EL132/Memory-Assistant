# backend/urls.py
# The "urls.py" file in the root folder serves as the main URL configuration for your entire Django project. It includes the URLs 
# from the "mysite" app using the include function, so the endpoints you defined in "mysite/urls.py" will be accessible under the "/api/" path.
from django.urls import path, include

urlpatterns = [
    # access them through: /endpoint1 or whatever their endpoint is
    path('api/', include('mysite.urls')),  # Include the URLs from 'mysite' app
]