import os

import pandas as pd  # noqa: F401  # kept for clarity; main type is DataFrame
from django.conf import settings


def generate_excel_report(dataframe, job_id: str) -> str:
    """
    Takes a Pandas DataFrame and saves it as an Excel file in the media folder.
    Returns the public URL of the file.
    """

    filename = f"comparison_report_{job_id}.xlsx"

    # Ensure media directory exists
    os.makedirs(settings.MEDIA_ROOT, exist_ok=True)

    # Absolute path on the server
    save_path = os.path.join(settings.MEDIA_ROOT, filename)

    # Write Excel file
    dataframe.to_excel(save_path, index=False)

    # Return URL (relative to host) for frontend to download
    return f"{settings.MEDIA_URL}{filename}"








