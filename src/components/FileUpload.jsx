
// src/components/FileUpload.jsx
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { UploadCloud, FileText, X } from 'lucide-react'

// --- Styled Components ---
const DropzoneContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  background-color: ${({ theme, $isDragActive }) => 
    $isDragActive ? theme.colors.background : theme.colors.surface};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const UploadText = styled.p`
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ theme }) => theme.spacing.md} 0 0 0;
`;

const SupportText = styled.p`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textDisabled};
`;

const FileList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  min-height: 50px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.spacing.sm};
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
  }
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
`;

const FileName = styled.span`
  font-family: ${({ theme }) => theme.typography.family.secondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
`;

const FileDetails = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const FileTypeBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.size.xs};
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${({ theme, $type }) => 
    $type === 'arxml' ? 'rgba(66, 133, 244, 0.1)' : 'rgba(52, 168, 83, 0.1)'};
  color: ${({ theme, $type }) => 
    $type === 'arxml' ? theme.colors.primary : theme.colors.success};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textDisabled};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

// --- File Upload Component ---
function FileUpload({ files, setFiles, setError, validateFiles, comparisonType }) {
  // Determine max files based on comparison type
  const maxFiles = comparisonType === 'full' ? 3 : undefined; // Full: max 3 (2 ARXML + 1 XSD), Schema: unlimited
  
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setError(null);
    
    if (fileRejections.length > 0) {
      setError("Invalid file type. Only .arxml and .xsd are supported.");
      return;
    }
    
    // For Full Comparison, limit total files to 3
    if (comparisonType === 'full') {
      const totalFiles = files.length + acceptedFiles.length;
      if (totalFiles > 3) {
        setError('Maximum 3 files allowed for Full Comparison (2 ARXML + 1 optional XSD)');
        return;
      }
    }
    
    const newFiles = [...files, ...acceptedFiles];
    
    if (validateFiles(newFiles)) {
      setFiles(newFiles);
    }
  }, [files, setFiles, setError, validateFiles, comparisonType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/xml': ['.arxml'],
      'text/xml': ['.xsd'],
    },
    maxFiles: maxFiles
  });

  const removeFile = (e, fileName) => {
    e.stopPropagation();
    const newFiles = files.filter(f => f.name !== fileName);
    setFiles(newFiles);
    validateFiles(newFiles);
  };

  return (
    <>
      <DropzoneContainer {...getRootProps()} $isDragActive={isDragActive}>
        <input {...getInputProps()} />
        <UploadCloud size={48} />
        <UploadText>
          {isDragActive ? "Drop the files here ..." : "Drag & drop files here, or click to select"}
        </UploadText>
        <SupportText>
          {comparisonType === 'full' 
            ? 'Full Comparison: Upload exactly 2 ARXML files + 1 optional XSD (max 3 files)'
            : 'Schema Validation: Upload multiple ARXML files (min 2) + 1 optional XSD'
          }
        </SupportText>
      </DropzoneContainer>

      <FileList>
        {files.map(file => (
          <FileItem key={file.name}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FileText size={18} />
              <FileInfo>
                <FileName title={file.name}>{file.name}</FileName>
                <FileDetails>
                  <FileTypeBadge $type={file.name.endsWith('.arxml') ? 'arxml' : 'xsd'}>
                    {file.name.endsWith('.arxml') ? 'ARXML' : 'XSD Schema'}
                  </FileTypeBadge>
                  <span>{(file.size / 1024).toFixed(1)} KB</span>
                </FileDetails>
              </FileInfo>
            </div>
            <RemoveButton onClick={(e) => removeFile(e, file.name)}>
              <X size={16} />
            </RemoveButton>
          </FileItem>
        ))}
      </FileList>
    </>
  );
}

export default FileUpload;