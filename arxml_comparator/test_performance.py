import os
import sys
import time

# Setup Django environment to find the jobs app
sys.path.append(os.getcwd())

from jobs.parser import parse_arxml_stream

TEST_FILE = "test_sample.arxml"

if not os.path.exists(TEST_FILE):
    print(f"❌ ERROR: Could not find {TEST_FILE}")
    sys.exit(1)

print(f"--- 🚀 Starting Performance Test on {TEST_FILE} ---")
print("Reading file...")

start_time = time.time()

try:
    count = 0
    
    # Run the Parser
    for node in parse_arxml_stream(TEST_FILE):
        count += 1
        
        # PRINT THE FIRST 5 NODES TO VERIFY NAMES AND PATHS
         
        if count <= 5:
            print(f"   Row {count}: Tag='{node['tag']}' | Name='{node['short_name']}'")
            print(f"           Path='{node.get('path', 'NO PATH FOUND')}'")
            print("-" * 20)
            
    end_time = time.time()
    duration = end_time - start_time

    print(f"✅ SUCCESS! Total Nodes: {count}")
    print(f"⏱️  Time: {duration:.4f}s")

except Exception as e:
    print(f"❌ CRASH: {e}")