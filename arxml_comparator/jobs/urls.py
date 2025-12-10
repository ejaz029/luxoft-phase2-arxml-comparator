# jobs/urls.py
from django.urls import path
from .views import FullComparisonUploadView

urlpatterns = [
    # Vertical slice: full ARXML comparison + Excel export
    path("full-comparison/", FullComparisonUploadView.as_view(), name="full-comparison"),
]