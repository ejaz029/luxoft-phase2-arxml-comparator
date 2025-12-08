# jobs/serializers.py
from rest_framework import serializers
from .models import ComparisonJob

class SchemaValidationUploadSerializer(serializers.Serializer):
    # Expects a single XSD file
    xsd_file = serializers.FileField(required=True)
    
    # Expects a LIST of ARXML files
    arxml_files = serializers.ListField(
        child=serializers.FileField(),
        allow_empty=False,
        write_only=True
    )

    def create(self, validated_data):
        xsd = validated_data.pop('xsd_file')
        files = validated_data.pop('arxml_files')
        
        # Create the job with the XSD
        job = ComparisonJob.objects.create(
            xsd_file=xsd,
            file_a_path="placeholder", # Fulfilling required field constraint
            status='UPLOADED'
        )
        
        # Save file names to the JSONField
        file_names = [f.name for f in files] 
        job.uploaded_files = file_names
        job.save()
        
        return job

class FullComparisonUploadSerializer(serializers.Serializer):
    # Expects exactly 2 ARXML files
    arxml_files = serializers.ListField(
        child=serializers.FileField(),
        allow_empty=False,
        min_length=2,
        max_length=2,
        write_only=True
    )
    
    # Expects an optional XSD file
    xsd_file = serializers.FileField(required=False, allow_null=True)

    def create(self, validated_data):
        files = validated_data.pop('arxml_files')
        xsd = validated_data.pop('xsd_file', None)
        
        # Create the job
        # We'll store the first file path in file_a_path and second in file_b_path
        # This is a simplification; in a real app with S3/media storage, these would be actual paths.
        # For now we are just saving the 'name' or a placeholder as per existing pattern.
        
        job = ComparisonJob.objects.create(
            xsd_file=xsd,
            file_a_path=files[0].name,
            file_b_path=files[1].name,
            status='UPLOADED'
        )
        
        # Save file names to the JSONField
        file_names = [f.name for f in files] 
        job.uploaded_files = file_names
        job.save()
        
        return job