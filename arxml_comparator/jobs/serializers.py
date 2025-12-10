# jobs/serializers.py
from rest_framework import serializers

# Serializer for Full Comparison (2 files)
class FullComparisonUploadSerializer(serializers.Serializer):
    file1 = serializers.FileField(required=True)
    file2 = serializers.FileField(required=True)
    comparison_mode = serializers.CharField(required=True)

    def validate_comparison_mode(self, value):
        if value != 'full':
            raise serializers.ValidationError("This endpoint is for Full Comparison only.")
        return value

# Serializer for Schema Validation (Multiple files)
class SchemaValidationUploadSerializer(serializers.Serializer):
    # ListField allows uploading multiple files
    arxml_files = serializers.ListField(
        child=serializers.FileField(),
        required=True,
        allow_empty=False
    )
    # Optional XSD file
    xsd_file = serializers.FileField(required=False)
    comparison_mode = serializers.CharField(required=True)

    def validate_comparison_mode(self, value):
        if value != 'schema':
            raise serializers.ValidationError("This endpoint is for Schema Validation only.")
        return value