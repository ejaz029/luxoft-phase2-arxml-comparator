from typing import Dict, Any, List

import pandas as pd

from .parser import parse_arxml_stream


def _build_path_index(file_path: str) -> Dict[str, Dict[str, Any]]:
    """
    Helper: parse a file and index nodes by their hierarchy path.
    """
    return {node["path"]: node for node in parse_arxml_stream(file_path)}


def compare_arxml_files(file1_path: str, file2_path: str) -> Dict[str, Any]:
    """
    Reads two ARXML files, compares their hierarchy paths, and returns:

    1. A summary dict for high‑level stats
    2. A Pandas DataFrame for the Excel report
    3. A simplified list of change records for the tree / change log view
    """

    # 1. Parse both files into Dictionaries {path: node_data}
    data_a = _build_path_index(file1_path)
    data_b = _build_path_index(file2_path)

    # 2. Get Sets of Paths for Comparison
    paths_a = set(data_a.keys())
    paths_b = set(data_b.keys())

    # 3. Set‑based diff logic
    added_paths = paths_b - paths_a
    removed_paths = paths_a - paths_b

    common_paths = paths_a & paths_b
    modified_paths: List[str] = []

    for path in common_paths:
        node_a = data_a[path]
        node_b = data_b[path]
        # Example modification rule: UUID changed
        if node_a.get("uuid") != node_b.get("uuid"):
            modified_paths.append(path)

    # 4. Prepare tabular data for Excel and UI tree / change log
    report_data: List[Dict[str, Any]] = []

    for path in added_paths:
        report_data.append(
            {
                "Type": "ADDED",
                "Path": path,
                "Name": data_b[path].get("short_name"),
            }
        )

    for path in removed_paths:
        report_data.append(
            {
                "Type": "REMOVED",
                "Path": path,
                "Name": data_a[path].get("short_name"),
            }
        )

    for path in modified_paths:
        report_data.append(
            {
                "Type": "MODIFIED",
                "Path": path,
                "Name": data_b[path].get("short_name"),
            }
        )

    df = pd.DataFrame(report_data)

    # 5. Build summary and return
    summary = {
        "added": len(added_paths),
        "removed": len(removed_paths),
        "modified": len(modified_paths),
    }

    return {
        "summary": summary,
        "excel_data": df,
        "tree_data": report_data,
    }










