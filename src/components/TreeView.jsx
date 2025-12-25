// src/components/TreeView.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { Folder, FolderOpen, File } from 'lucide-react';

// --- Styled Components ---

const TreeContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  max-height: 400px;
  overflow-y: auto;
  font-family: ${({ theme }) => theme.typography.family.secondary};
  font-size: 0.9rem;
`;

const TreeNode = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const TreeNodeContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  cursor: ${({ $isFolder }) => ($isFolder ? 'pointer' : 'default')};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background-color 0.2s ease;
  color: ${({ $status, theme }) => {
    if ($status === 'added') return theme.colors.success || '#10b981';
    if ($status === 'removed') return theme.colors.danger || '#ef4444';
    if ($status === 'modified') return '#f59e0b';
    return theme.colors.textPrimary;
  }};
  background-color: ${({ $isStriped, theme }) =>
    $isStriped ? theme.colors.background : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const TreeNodeLabel = styled.span`
  font-size: 0.9rem;
  user-select: none;
  font-family: ${({ theme }) => theme.typography.family.secondary};
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px dotted ${({ theme }) => theme.colors.border};
    opacity: 0.6;
  }
`;

const StatusBadge = styled.span`
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${({ $status }) => {
    if ($status === 'added') return '#d1fae5';
    if ($status === 'removed') return '#fee2e2';
    if ($status === 'modified') return '#fef3c7';
    return 'transparent';
  }};
  color: ${({ $status }) => {
    if ($status === 'added') return '#065f46';
    if ($status === 'removed') return '#991b1b';
    if ($status === 'modified') return '#92400e';
    return 'inherit';
  }};
  min-width: 70px;
  text-align: center;
`;

const TreeChildren = styled.ul`
  list-style: none;
  padding-left: 18px;
  margin: 0;
  display: ${({ $isExpanded }) => ($isExpanded ? 'block' : 'none')};
  border-left: 1px dashed ${({ theme }) => theme.colors.border};
  margin-left: 6px;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;

// --- Recursive Tree Node Component ---

function TreeNodeComponent({ node, level = 0, index = 0 }) {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels

  const isFolder = node.type === 'folder';
  const hasChildren = node.children && node.children.length > 0;
  const isStriped = index % 2 === 1;

  const handleToggle = () => {
    if (isFolder && hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const getIcon = () => {
    const status = node.status;
    const color =
      status === 'added'
        ? '#10b981'
        : status === 'removed'
        ? '#ef4444'
        : status === 'modified'
        ? '#f59e0b'
        : undefined;

    if (isFolder) {
      return isExpanded ? (
        <FolderOpen size={16} />
      ) : (
        <Folder size={16} />
      );
    }
    // For leaf nodes, color icon based on status
    return <File size={16} color={color} />;
  };

  return (
    <TreeNode>
      <TreeNodeContent
        $isFolder={isFolder}
        $status={node.status}
        $isStriped={isStriped}
        onClick={handleToggle}
      >
        <IconWrapper>{getIcon()}</IconWrapper>
        <TreeNodeLabel>{node.name}</TreeNodeLabel>
        {node.status && (
          <StatusBadge $status={node.status}>
            {node.status}
          </StatusBadge>
        )}
      </TreeNodeContent>
      {hasChildren && (
        <TreeChildren $isExpanded={isExpanded}>
          {node.children.map((child, childIndex) => (
            <TreeNodeComponent
              key={`${child.name}-${childIndex}`}
              node={child}
              level={level + 1}
              index={childIndex}
            />
          ))}
        </TreeChildren>
      )}
    </TreeNode>
  );
}

// --- Main Tree View Component ---

function TreeView({ treeData, theme }) {
  if (!treeData || treeData.length === 0) {
    return (
      <TreeContainer theme={theme}>
        <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
          No tree data available.
        </div>
      </TreeContainer>
    );
  }

  return (
    <TreeContainer theme={theme}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {treeData.map((node, index) => (
          <TreeNodeComponent
            key={`root-${node.name}-${index}`}
            node={node}
            level={0}
            index={index}
          />
        ))}
      </ul>
    </TreeContainer>
  );
}

export default TreeView;

