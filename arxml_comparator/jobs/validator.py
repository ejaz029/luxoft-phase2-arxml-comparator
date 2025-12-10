# jobs/validator.py
import os
import xmlschema

def validate_schema(xml_file_path, xsd_file_path):
    """
    Validates an ARXML file against a given XSD schema.

    Args:
        xml_file_path (str): Path to the .arxml file.
        xsd_file_path (str): Path to the .xsd schema file.

    Returns:
        tuple: (True, None) if valid.
               (False, [list_of_errors]) if invalid.
    """
    
    # 1. Safety Checks
    if not os.path.exists(xml_file_path):
        return False, [f"XML file not found: {xml_file_path}"]
    
    if not os.path.exists(xsd_file_path):
        return False, [f"XSD schema file not found : {xsd_file_path}"]

    try:
        # 2. Load the Schema
        # This parses the XSD file to understand the rules
        schema = xmlschema.XMLSchema(xsd_file_path)

        # 3. Check Validity
        # is_valid() returns True/False. We check it first for speed.
        if schema.is_valid(xml_file_path):
            return True, None
        
        # 4. Capture Errors (if invalid)
        # iter_errors() gives us the specific details of what went wrong
        errors = []
        for error in schema.iter_errors(xml_file_path):
            # We convert the error object to a string to make it readable/storable
            errors.append(str(error))
            
        return False, errors

    except Exception as e:
        # Handle catastrophic failures (like a corrupted file)
        return False, [str(e)] 