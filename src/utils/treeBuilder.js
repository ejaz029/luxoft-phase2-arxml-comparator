/**
 * Utility function to convert a flat list of items with path strings
 * into a nested tree structure suitable for rendering.
 * 
 * @param {Array} flatList - Array of items with 'path' property and 'type' ('ADDED', 'REMOVED', 'MODIFIED')
 * @returns {Array} - Nested tree structure with nodes containing { name, type, children, status }
 */
export function buildTreeData(flatList) {
  if (!flatList || flatList.length === 0) {
    return [];
  }

  // Create a root node to hold all paths
  const root = { name: 'root', type: 'folder', children: {}, status: null };

  // Process each item in the flat list
  flatList.forEach((item) => {
    // Get the path (handle both 'path' and 'Path' properties)
    const pathStr = item.path || item.Path || '';
    if (!pathStr) return;

    // Get the status/type (normalize to lowercase)
    const status = (item.type || item.Type || '').toLowerCase();
    if (!['added', 'removed', 'modified'].includes(status)) return;

    // Split path into segments (e.g., "/AUTOSAR/Pkg/Component" -> ["", "AUTOSAR", "Pkg", "Component"])
    const segments = pathStr.split('/').filter(seg => seg.length > 0);
    
    if (segments.length === 0) return;

    // Traverse/create the tree structure
    let current = root;
    segments.forEach((segment, index) => {
      const isLeaf = index === segments.length - 1;

      // If this segment doesn't exist, create it
      if (!current.children[segment]) {
        current.children[segment] = {
          name: segment,
          type: isLeaf ? 'file' : 'folder',
          children: {},
          status: isLeaf ? status : null, // Only leaf nodes have status
        };
      }

      // Move to the next level
      current = current.children[segment];

      // If this is a leaf node and we haven't set status yet, set it
      if (isLeaf && !current.status) {
        current.status = status;
      }
    });
  });

  // Convert the children object to an array and recursively process
  function convertToArray(node) {
    const childrenArray = Object.values(node.children).map(child => {
      return {
        name: child.name,
        type: child.type,
        status: child.status,
        children: convertToArray(child), // Recursively convert children
      };
    });

    return childrenArray;
  }

  // Return the root's children as an array
  return convertToArray(root);
}





