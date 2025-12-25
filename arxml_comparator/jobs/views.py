# jobs/views.py
import uuid
import os
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated

from .models import ComparisonJob
# Make sure you have all these imports correct
from .serializers import FullComparisonUploadSerializer, SchemaValidationUploadSerializer
from .comparator import compare_arxml_files
from .exporter import generate_excel_report

# --- VIEW 1: FULL COMPARISON (The "Vertical Slice") ---
class FullComparisonUploadView(APIView):
    """
    Vertical slice: accepts two ARXML files, runs comparison,
    generates an Excel report, and returns summary + tree data + Excel URL.
    Requires JWT authentication.
    """
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print("Received Full Comparison Request...")
        print(f"User: {request.user}")
        print(f"User authenticated: {request.user.is_authenticated}")
        print(f"Authorization header: {request.META.get('HTTP_AUTHORIZATION', 'NOT FOUND')}")
        serializer = FullComparisonUploadSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        new_job_id = str(uuid.uuid4())
        file1 = serializer.validated_data['file1']
        file2 = serializer.validated_data['file2']

        # 1. Save uploaded files to disk
        # Create a directory for this job's files
        job_dir = os.path.join(settings.MEDIA_ROOT, 'uploads', new_job_id)
        os.makedirs(job_dir, exist_ok=True)
        
        # Save files with their original names
        file1_path = os.path.join(job_dir, file1.name)
        file2_path = os.path.join(job_dir, file2.name)
        
        with open(file1_path, 'wb+') as destination:
            for chunk in file1.chunks():
                destination.write(chunk)
        
        with open(file2_path, 'wb+') as destination:
            for chunk in file2.chunks():
                destination.write(chunk)

        # 2. Save initial job with PROCESSING status (store paths as strings)
        job = ComparisonJob.objects.create(
            job_id=new_job_id,
            status='PROCESSING',
            file_a_path=file1_path,
            file_b_path=file2_path,
            user_name=request.user.username
        )

        try:
            # 3. Run diff engine on the stored file paths
            path_a = job.file_a_path
            path_b = job.file_b_path

            print(f"Comparing: {path_a} vs {path_b}")
            comparison_result = compare_arxml_files(path_a, path_b)

            # 4. Generate Excel report
            excel_url = generate_excel_report(
                comparison_result['excel_data'], new_job_id
            )

            # 5. Update job with completed status and summary
            job.status = 'COMPLETED'
            job.results = comparison_result['summary']
            job.save()

            # 6. Respond to frontend
            return Response({
                "status": "success",
                "job_id": job.job_id,
                "summary": comparison_result['summary'],
                "tree_data": comparison_result['tree_data'],
                "excel_url": excel_url
            }, status=status.HTTP_200_OK)

        except Exception as exc:
            print(f"❌ CRASH: {str(exc)}")
            job.status = 'FAILED'
            job.save()
            return Response({"error": str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# --- VIEW 2: SCHEMA VALIDATION (Kept for completeness) ---
class SchemaValidationUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print("Received Schema Request...")
        serializer = SchemaValidationUploadSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                new_job_id = str(uuid.uuid4())
                files_list = serializer.validated_data['arxml_files'] 
                xsd = serializer.validated_data.get('xsd_file')
                
                saved_file_names = []
                for f in files_list:
                    saved_file_names.append(f.name) 

                job = ComparisonJob.objects.create(
                    job_id=new_job_id,
                    status='UPLOADED',
                    uploaded_files=saved_file_names,
                    xsd_file=xsd,
                    user_name=request.user.username
                )

                return Response({
                    "status": "success", 
                    "job_id": job.job_id,
                    "message": f"Successfully uploaded {len(saved_file_names)} files."
                }, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                print(f"❌ CRASH: {str(e)}")
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)