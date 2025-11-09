# In jobs/admin.py

from django.contrib import admin
from .models import ComparisonJob

# Register your models here.

# This @admin.register decorator is the modern way to register a model.
@admin.register(ComparisonJob)
class ComparisonJobAdmin(admin.ModelAdmin):
    # These fields will be displayed in the list view of the admin panel
    list_display = ('job_id', 'status', 'created_at', 'updated_at')
    
    # This adds a filter sidebar for the 'status' field
    list_filter = ('status',)
    
    # These fields will be shown as read-only (since they are set automatically)
    readonly_fields = ('job_id', 'created_at', 'updated_at')