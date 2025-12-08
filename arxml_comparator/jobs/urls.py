# jobs/urls.py
from django.urls import path
from .views import SchemaValidationUploadView, FullComparisonUploadView

urlpatterns = [
    # This creates the full path: 127.0.0.1:8000/api/jobs/schema/
    path('api/jobs/schema/', SchemaValidationUploadView.as_view(), name='schema-upload'),
    path('api/jobs/upload/full/', FullComparisonUploadView.as_view(), name='full-comparison-upload'),
]