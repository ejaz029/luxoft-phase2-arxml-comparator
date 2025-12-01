from rest_framework import serializers
from django.core.exceptions import ValidationError

class FullComparisonUploadSerializer(serializers.Serializer):
    file1 = serializers.FileField(required=True)
    file2 = serializers.FileField(required=True)
    comparison_mode = serializers.CharField(required=True)

    def validate_comparison_mode(self, value):
        if value != 'full':
            raise serializers.ValidationError("Only 'full' comparison mode is supported.")
        return value

    def validate(self, data):
        if 'file1' not in data or 'file2' not in data:
            raise serializers.ValidationError("Both file1 and file2 are required.")
        return data
