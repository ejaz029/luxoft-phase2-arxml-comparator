
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
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FileName = styled.span`
  font-family: ${({ theme }) => theme.typography.family.secondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-left: ${({ theme }) => theme.spacing.sm};
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
              <FileText size={16} />
              <FileName>{file.name}</FileName>
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