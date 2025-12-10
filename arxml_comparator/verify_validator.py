import os
import sys

# Setup path to find the jobs module
sys.path.append(os.getcwd())

from jobs.validator import validate_schema

# --- 1. Create Dummy Test Files ---
# This is a rule book: "A Car must have a Make (string) and Year (integer)"
XSD_CONTENT = """<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="Car">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Make" type="xs:string"/>
        <xs:element name="Year" type="xs:integer"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>
"""

# Valid Data
GOOD_XML = """<?xml version="1.0"?>
<Car>
  <Make>Toyota</Make>
  <Year>2022</Year>
</Car>
"""

# Invalid Data (Year is "Old", which is not an integer!)
BAD_XML = """<?xml version="1.0"?>
<Car>
  <Make>Toyota</Make>
  <Year>Old</Year> 
</Car>
"""

# Write files to disk
with open("test_schema.xsd", "w") as f: f.write(XSD_CONTENT)
with open("test_good.xml", "w") as f: f.write(GOOD_XML)
with open("test_bad.xml", "w") as f: f.write(BAD_XML)

# --- 2. Run Tests ---
print("--- 🛡️ Testing Schema Validator ---")

# Test 1: Valid File
print("\n1. Testing Valid File (Should Pass)...")
success, errors = validate_schema("test_good.xml", "test_schema.xsd")
if success:
    print("✅ PASS: Good XML passed validation.")
else:
    print(f"❌ FAIL: Good XML failed! Errors: {errors}")

# Test 2: Invalid File
print("\n2. Testing Invalid File (Should Fail)...")
success, errors = validate_schema("test_bad.xml", "test_schema.xsd")
if not success:
    print("✅ PASS: Bad XML failed validation as expected.")
    print(f"   Captured Error: {errors[0]}")
else:
    print("❌ FAIL: Bad XML passed validation (it should have failed!)")

# Cleanup
# os.remove("test_schema.xsd")
# os.remove("test_good.xml")
# os.remove("test_bad.xml")