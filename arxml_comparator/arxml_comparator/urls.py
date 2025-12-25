# """
# URL configuration for arxml_comparator project.

# The `urlpatterns` list routes URLs to views. For more information please see:
#     https://docs.djangoproject.com/en/5.2/topics/http/urls/
# Examples:
# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')
# Class-based views
#     1. Add an import:  from other_app.views import Home
#     2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
# Including another URLconf
#     1. Import the include() function: from django.urls import include, path
#     2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# """
# from django.contrib import admin
# from django.urls import path, include
# from jobs import views
# from .views import SchemaValidationUploadView

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/jobs/', views.create_comparison_job, name='create_job'),
#     path('api/jobs/<uuid:job_id>/', views.get_job_status, name='get_job_status'),
#     path('upload/schema/', SchemaValidationUploadView.as_view(), name='upload-schema'),

# ]



# arxml_comparator/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    # JWT Authentication endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # This line tells Django: "Go look in the jobs folder for any URL starting with api/jobs/"
    path('api/jobs/', include('jobs.urls')), 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)