# jobs/parser.py
from lxml import etree
import os

def parse_arxml_stream(file_path):
    """
    Efficiently parses large ARXML files using streaming.
    Correctly maintains a path stack and handles memory cleanup safely.
    """
    
    # 1. Initialize context to None immediately to prevent "UnboundLocalError"
    context = None
    
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")

    try:
        # 2. Initialize the stream
        context = etree.iterparse(file_path, events=('start', 'end'), recover=True)
        
        # Stack stores dictionaries: {'tag': 'AR-PACKAGE', 'name': None}
        path_stack = []
        
        for event, elem in context:
            tag_name = etree.QName(elem).localname
            
            if event == 'start':
                path_stack.append({'tag': tag_name, 'name': None})
                
            elif event == 'end':
                # 1. Update Parent Name if current node is SHORT-NAME
                if tag_name == 'SHORT-NAME' and elem.text:
                    # Update parent immediately
                    if len(path_stack) > 1:
                        path_stack[-2]['name'] = elem.text

                # 2. Get current node info
                current_node_info = path_stack[-1]
                short_name = current_node_info['name']
                uuid = elem.get('UUID')

                # 3. Build Full Path
                # Filter out None values to avoid empty slashes
                valid_names = [item['name'] for item in path_stack if item['name']]
                full_path = "/" + "/".join(valid_names)

                # 4. Yield Data
                if uuid or short_name:
                    if tag_name != 'SHORT-NAME':
                        node_data = {
                            'tag': tag_name,
                            'uuid': uuid,
                            'short_name': short_name,
                            'path': full_path,
                            'attrib': dict(elem.attrib), 
                        }
                        yield node_data

                # 5. Clean up Stack & Memory
                path_stack.pop()
                elem.clear()
                while elem.getprevious() is not None:
                    del elem.getparent()[0]
                    
    except etree.XMLSyntaxError as e:
        print(f"XML Parsing Error: {e}")
        
    finally:
        # 6. Safely clean up context only if it exists
        if context is not None:
            del context