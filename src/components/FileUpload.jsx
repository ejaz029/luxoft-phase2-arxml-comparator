
// src/components/FileUpload.jsx
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { UploadCloud, FileText, X } from 'lucide-react'

// --- Styled Components ---
const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.lg} auto;
`;

const UploadBoxesContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const UploadBox = styled.div`
  flex: 1;
  border: 2px dashed ${({ theme, $isOriginal }) => 
    $isOriginal ? theme.colors.border : theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  cursor: pointer;
  background-color: ${({ theme, $isDragActive }) => 
    $isDragActive ? theme.colors.background : theme.colors.surface};
  transition: all 0.2s ease-in-out;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    border-color: ${({ theme, $isOriginal }) => 
      $isOriginal ? theme.colors.textSecondary : theme.colors.primary};
  }

  @media (max-width: 768px) {
    min-height: 160px;
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    min-height: 140px;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const UploadLabel = styled.h3`
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

const UploadText = styled.p`
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ theme }) => theme.spacing.md} 0 0 0;
  word-wrap: break-word;
  max-width: 100%;
  
  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.size.sm};
    margin: ${({ theme }) => theme.spacing.sm} 0 0 0;
  }
`;

const SupportText = styled.p`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textDisabled};
  margin-top: ${({ theme }) => theme.spacing.xs};
  word-wrap: break-word;
  max-width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.xs};
  line-height: 1.4;
  overflow-wrap: break-word;
  
  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.size.xs};
    line-height: 1.3;
  }
`;

const FileNameDisplay = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  max-width: 100%;
`;

const FileName = styled.span`
  font-family: ${({ theme }) => theme.typography.family.secondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  text-align: left;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textDisabled};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

// --- File Upload Component ---
function FileUpload({ originalFile, setOriginalFile, updatedFile, setUpdatedFile, setError }) {
  const handleOriginalDrop = useCallback((acceptedFiles, fileRejections) => {
    setError(null);
    
    if (fileRejections.length > 0) {
      setError("Invalid file type. Only .arxml files are supported.");
      return;
    }
    
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (!file.name.toLowerCase().endsWith('.arxml')) {
        setError("Only .arxml files are allowed");
        return;
      }
      setOriginalFile(file);
    }
  }, [setOriginalFile, setError]);

  const handleUpdatedDrop = useCallback((acceptedFiles, fileRejections) => {
    setError(null);
    
    if (fileRejections.length > 0) {
      setError("Invalid file type. Only .arxml files are supported.");
      return;
    }
    
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (!file.name.toLowerCase().endsWith('.arxml')) {
        setError("Only .arxml files are allowed");
        return;
      }
      setUpdatedFile(file);
    }
  }, [setUpdatedFile, setError]);

  const originalDropzone = useDropzone({
    onDrop: handleOriginalDrop,
    accept: {
      'application/xml': ['.arxml'],
    },
    maxFiles: 1,
    multiple: false
  });

  const updatedDropzone = useDropzone({
    onDrop: handleUpdatedDrop,
    accept: {
      'application/xml': ['.arxml'],
    },
    maxFiles: 1,
    multiple: false
  });

  const removeOriginalFile = (e) => {
    e.stopPropagation();
    setOriginalFile(null);
  };

  const removeUpdatedFile = (e) => {
    e.stopPropagation();
    setUpdatedFile(null);
  };

  return (
    <FileUploadWrapper>
      <UploadBoxesContainer>
        {/* Original File Box */}
        <UploadBox 
          {...originalDropzone.getRootProps()} 
          $isDragActive={originalDropzone.isDragActive}
          $isOriginal={true}
        >
          <input {...originalDropzone.getInputProps()} />
          <UploadLabel>📂 Original File (Old)</UploadLabel>
          <UploadCloud size={40} />
          <UploadText>
            {originalDropzone.isDragActive 
              ? "Drop the file here ..." 
              : "Drag & drop or click to select"}
          </UploadText>
          <SupportText>
            Upload the older/original ARXML file
          </SupportText>
          {originalFile && (
            <FileNameDisplay>
              <FileText size={18} />
              <FileName title={originalFile.name}>{originalFile.name}</FileName>
              <RemoveButton onClick={removeOriginalFile}>
                <X size={16} />
              </RemoveButton>
            </FileNameDisplay>
          )}
        </UploadBox>

        {/* Updated File Box */}
        <UploadBox 
          {...updatedDropzone.getRootProps()} 
          $isDragActive={updatedDropzone.isDragActive}
          $isOriginal={false}
        >
          <input {...updatedDropzone.getInputProps()} />
          <UploadLabel>🚀 Updated File (New)</UploadLabel>
          <UploadCloud size={40} />
          <UploadText>
            {updatedDropzone.isDragActive 
              ? "Drop the file here ..." 
              : "Drag & drop or click to select"}
          </UploadText>
          <SupportText>
            Upload the newer/updated ARXML file
          </SupportText>
          {updatedFile && (
            <FileNameDisplay>
              <FileText size={18} />
              <FileName title={updatedFile.name}>{updatedFile.name}</FileName>
              <RemoveButton onClick={removeUpdatedFile}>
                <X size={16} />
              </RemoveButton>
            </FileNameDisplay>
          )}
        </UploadBox>
      </UploadBoxesContainer>
    </FileUploadWrapper>
  );
}

export default FileUpload;