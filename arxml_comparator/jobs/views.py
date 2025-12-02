import os
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import FullComparisonUploadSerializer

class FullComparisonUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request, *args, **kwargs):
        serializer = FullComparisonUploadSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Create media directory if it doesn't exist
            os.makedirs(settings.MEDIA_ROOT, exist_ok=True)
            
            # Save the uploaded files
            file1 = request.FILES['file1']
            file2 = request.FILES['file2']
            
            file1_path = os.path.join(settings.MEDIA_ROOT, file1.name)
            file2_path = os.path.join(settings.MEDIA_ROOT, file2.name)
            
            # Save files to the media directory
            with open(file1_path, 'wb+') as destination:
                for chunk in file1.chunks():
                    destination.write(chunk)
                    
            with open(file2_path, 'wb+') as destination:
                for chunk in file2.chunks():
                    destination.write(chunk)
            
            # Here you would typically create a database record for the comparison job
            # and return a job ID to the client for status checking
            
            return Response({
                'status': 'success',
                'message': 'Files uploaded successfully',
                'file1': file1.name,
                'file2': file2.name,
                'comparison_mode': 'full'
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
