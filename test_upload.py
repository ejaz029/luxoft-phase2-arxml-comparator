import requests

# Test the file upload endpoint
url = "http://127.0.0.1:8000/api/jobs/upload/full/"

# Create test files
with open("test1.arxml", "w") as f:
    f.write("<?xml version='1.0'?><AUTOSAR></AUTOSAR>")

with open("test2.arxml", "w") as f:
    f.write("<?xml version='1.0'?><AUTOSAR><AR-PACKAGES></AR-PACKAGES></AUTOSAR>")

# Prepare files for upload
files = {
    'file1': open('test1.arxml', 'rb'),
    'file2': open('test2.arxml', 'rb')
}

data = {
    'comparison_mode': 'full'
}

try:
    # Make the POST request
    response = requests.post(url, files=files, data=data)
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 201:
        print("\n✅ SUCCESS: File upload endpoint is working!")
        print("Files have been uploaded to the media directory.")
    else:
        print("\n❌ ERROR: Something went wrong")
        
except requests.exceptions.ConnectionError:
    print("\n❌ ERROR: Could not connect to the server.")
    print("Make sure the Django server is running with: python manage.py runserver")
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")

# Clean up
files['file1'].close()
files['file2'].close()
