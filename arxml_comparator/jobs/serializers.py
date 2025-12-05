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