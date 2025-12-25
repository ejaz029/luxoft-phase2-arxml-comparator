
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
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const VsBadge = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  z-index: ${({ theme }) => theme.zIndex.floating || 10};

  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin: ${({ theme }) => theme.spacing.md} auto;
  }
`;

const UploadBox = styled.div`
  flex: 1;
  border: 2px dashed #e2e8f0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  cursor: pointer;
  background-color: ${({ theme, $isDragActive }) =>
    $isDragActive ? '#f0f9ff' : theme.colors.surface};
  transition: all 0.3s ease;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: #f0f9ff;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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
        <VsBadge>
          VS
        </VsBadge>
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