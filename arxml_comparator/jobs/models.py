import uuid
from django.db import models

# This model directly fulfills Acceptance Criteria (AC #3)
class ComparisonJob(models.Model):
    """
    Tracks the state and files for a single comparison task.
    This model adheres to the Acceptance Criteria for 'ABASC-20'.
    """
    
    # Define status choices (as per AC #3)
    STATUS_UPLOADED = 'UPLOADED'
    STATUS_PROCESSING = 'PROCESSING'
    STATUS_COMPLETED = 'COMPLETED'
    STATUS_FAILED = 'FAILED'
    
    STATUS_CHOICES = [
        (STATUS_UPLOADED, 'Uploaded'),
        (STATUS_PROCESSING, 'Processing'),
        (STATUS_COMPLETED, 'Completed'),
        (STATUS_FAILED, 'Failed'),
    ]

    # --- Fields from Acceptance Criteria (AC #3) ---
    
    # Use UUID for a unique, non-guessable job_id
    job_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Status field with predefined choices
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_UPLOADED
    )
    
    # Paths to the uploaded files. 
    # file_b_path is allowed to be blank (e.g., for a single-file validation)
    file_a_path = models.CharField(max_length=1024)
    file_b_path = models.CharField(max_length=1024, blank=True, null=True) 
    
    # Store results (e.g., the diff JSON or an error message). 
    # JSONField is flexible.
    results = models.JSONField(blank=True, null=True)

    # Add this new column:
    user_name = models.CharField(max_length=150, blank=True, null=True)

    # --- Bonus Fields (Best Practice) ---
    # Timestamps to track when the job was created and updated
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # This is what you'll see in the admin panel
        return f"Job {self.job_id} ({self.status})"