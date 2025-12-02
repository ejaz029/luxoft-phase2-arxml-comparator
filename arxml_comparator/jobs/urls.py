from django.urls import path
from .views import FullComparisonUploadView

urlpatterns = [
    path('upload/full/', FullComparisonUploadView.as_view(), name='full-comparison-upload'),
]
