import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { useTheme } from '../theme/ThemeProvider.jsx'
import { Upload, File, X, AlertCircle, CheckCircle } from 'lucide-react'

const UploadContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`

const Title = styled.h1`
  font-family: ${props => props.theme.typography.family.primary};
  font-size: ${props => props.theme.typography.size['3xl']};
  font-weight: ${props => props.theme.typography.weight.bold};
  color: ${props => props.theme.colors.textPrimary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`

const Description = styled.p`
  font-family: ${props => props.theme.typography.family.primary};
  font-size: ${props => props.theme.typography.size.lg};
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['2xl']};
  line-height: ${props => props.theme.typography.lineHeight.normal};
`

const DropzoneContainer = styled.div`
  border: 2px dashed ${props => props.isDragActive ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing['2xl']};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.isDragActive ? props.theme.colors.primary + '10' : 'transparent'};
  margin-bottom: ${props => props.theme.spacing.xl};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primary + '05'};
  }
`

const DropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`

const UploadIcon = styled(Upload)`
  width: 48px;
  height: 48px;
  color: ${props => props.theme.colors.primary};
`

const DropzoneText = styled.div`
  font-family: ${props => props.theme.typography.family.primary};
  font-size: ${props => props.theme.typography.size.lg};
  font-weight: ${props => props.theme.typography.weight.medium};
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.sm};
`

const DropzoneSubtext = styled.div`
  font-family: ${props => props.theme.typography.family.primary};
  font-size: ${props => props.theme.typography.size.sm};
  color: ${props => props.theme.colors.textSecondary};
`

const FileList = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.surface};
`

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`

const FileIcon = styled(File)`
  width: 20px;
  height: 20px;
  color: ${props => props.theme.colors.primary};
`

const FileName = styled.span`
  font-family: ${props => props.theme.typography.family.primary};
  font-size: ${props => props.theme.typography.size.base};
  color: ${props => props.theme.colors.textPrimary};
`

const FileSize = styled.span`
  font-family: ${props => props.theme.typography.family.primary};
  font-size: ${props => props.theme.typography.size.sm};
  color: ${props => props.theme.colors.textSecondary};
`

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.sm};
  color: ${props => props.theme.colors.danger};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.danger + '10'};
  }
`

const ValidationMessage = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  background-color: ${props => props.isError ? props.theme.colors.danger + '10' : props.theme.colors.success + '10'};
  border: 1px solid ${props => props.isError ? props.theme.colors.danger : props.theme.colors.success};
`

const ValidationIcon = styled.div`
  color: ${props => props.isError ? props.theme.colors.danger : props.theme.colors.success};
`

const ValidationText = styled.span`
  font-family: ${props => props.theme.typography.family.primary};
  font-size: ${props => props.theme.typography.size.sm};
  color: ${props => props.isError ? props.theme.colors.danger : props.theme.colors.success};
  font-weight: ${props => props.theme.typography.weight.medium};
`

const SubmitButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: ${props => props.disabled ? props.theme.colors.textDisabled : props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: ${props => props.theme.typography.family.primary};
  font-size: ${props => props.theme.typography.size.lg};
  font-weight: ${props => props.theme.typography.weight.semibold};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${props => props.theme.colors.primary + '30'};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`

const FileUpload = ({ onComparisonComplete, isLoading, setIsLoading }) => {
  const { currentTheme } = useTheme()
  const [files, setFiles] = useState([])
  const [validationMessage, setValidationMessage] = useState('')

  // File validation function
  const validateFiles = (fileList) => {
    const validExtensions = ['.arxml', '.xsd']
    const errors = []

    // Check file count
    if (fileList.length === 0) {
      errors.push('Please upload at least one file')
    } else if (fileList.length > 2) {
      errors.push('Maximum 2 files allowed for comparison')
    }

    // Check file extensions
    fileList.forEach((file, index) => {
      const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
      if (!validExtensions.includes(extension)) {
        errors.push(`File ${index + 1}: Only .arxml and .xsd files are allowed`)
      }
    })

    // Check for at least one ARXML file
    const hasArxml = fileList.some(file => 
      file.name.toLowerCase().endsWith('.arxml')
    )
    if (fileList.length > 0 && !hasArxml) {
      errors.push('At least one .arxml file is required')
    }

    return errors
  }

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = [...files, ...acceptedFiles]
    const errors = validateFiles(newFiles)
    
    if (errors.length > 0) {
      setValidationMessage(errors[0])
      setFiles([]) // Clear files if validation fails
    } else {
      setFiles(newFiles)
      setValidationMessage('')
    }
  }, [files])

  const removeFile = (indexToRemove) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove)
    setFiles(newFiles)
    
    if (newFiles.length === 0) {
      setValidationMessage('')
    } else {
      const errors = validateFiles(newFiles)
      if (errors.length > 0) {
        setValidationMessage(errors[0])
      } else {
        setValidationMessage('')
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/xml': ['.arxml', '.xsd'],
      'text/xml': ['.arxml', '.xsd']
    },
    multiple: true
  })

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleSubmit = async () => {
    if (files.length === 0) return
    
    setIsLoading(true)
    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock comparison data
      const mockData = {
        files: files.map(f => f.name),
        differences: [
          { type: 'added', path: 'ECU/SoftwareComponent', description: 'New software component added' },
          { type: 'modified', path: 'ECU/Configuration', description: 'Configuration parameter changed' },
          { type: 'removed', path: 'ECU/Interface', description: 'Interface removed' }
        ],
        summary: '3 differences found between the ARXML files'
      }
      
      onComparisonComplete(mockData)
    } catch (error) {
      console.error('Comparison failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isSubmitDisabled = files.length === 0 || validationMessage !== '' || isLoading

  return (
    <UploadContainer theme={currentTheme}>
      <Title theme={currentTheme}>
        ARXML Semantic Comparator
      </Title>
      
      <Description theme={currentTheme}>
        Upload your ARXML and XSD files to perform a semantic comparison. 
        Maximum 2 files allowed, at least one must be an ARXML file.
      </Description>

      <DropzoneContainer 
        {...getRootProps()} 
        isDragActive={isDragActive}
        theme={currentTheme}
      >
        <input {...getInputProps()} />
        <DropzoneContent theme={currentTheme}>
          <UploadIcon theme={currentTheme} />
          <DropzoneText theme={currentTheme}>
            {isDragActive ? 'Drop files here' : 'Drag & drop files here, or click to select'}
          </DropzoneText>
          <DropzoneSubtext theme={currentTheme}>
            Supports .arxml and .xsd files
          </DropzoneSubtext>
        </DropzoneContent>
      </DropzoneContainer>

      {files.length > 0 && (
        <FileList theme={currentTheme}>
          {files.map((file, index) => (
            <FileItem key={index} theme={currentTheme}>
              <FileInfo theme={currentTheme}>
                <FileIcon theme={currentTheme} />
                <div>
                  <FileName theme={currentTheme}>{file.name}</FileName>
                  <FileSize theme={currentTheme}>{formatFileSize(file.size)}</FileSize>
                </div>
              </FileInfo>
              <RemoveButton 
                onClick={() => removeFile(index)}
                theme={currentTheme}
              >
                <X size={16} />
              </RemoveButton>
            </FileItem>
          ))}
        </FileList>
      )}

      {validationMessage && (
        <ValidationMessage 
          isError={true}
          theme={currentTheme}
        >
          <ValidationIcon isError={true}>
            <AlertCircle size={16} />
          </ValidationIcon>
          <ValidationText isError={true} theme={currentTheme}>
            {validationMessage}
          </ValidationText>
        </ValidationMessage>
      )}

      {files.length > 0 && !validationMessage && (
        <ValidationMessage 
          isError={false}
          theme={currentTheme}
        >
          <ValidationIcon isError={false}>
            <CheckCircle size={16} />
          </ValidationIcon>
          <ValidationText isError={false} theme={currentTheme}>
            Files ready for comparison
          </ValidationText>
        </ValidationMessage>
      )}

      <SubmitButton 
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        theme={currentTheme}
      >
        {isLoading ? 'Processing...' : 'Compare Files'}
      </SubmitButton>
    </UploadContainer>
  )
}

export default FileUpload
