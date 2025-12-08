from django.shortcuts import render

# Create your views here.
# jobs/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SchemaValidationUploadSerializer

class SchemaValidationUploadView(APIView):
    def post(self, request, *args, **kwargs):
        # We pass request.FILES because we are handling file uploads
        serializer = SchemaValidationUploadSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Files uploaded successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from .serializers import FullComparisonUploadSerializer

class FullComparisonUploadView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = FullComparisonUploadSerializer(data=request.data)
        
        if serializer.is_valid():
            job = serializer.save()
            return Response(
                {
                    "message": "Files uploaded successfully", 
                    "job_id": job.job_id,
                    "status": job.status
                },
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)