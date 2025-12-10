// import React, { useState } from 'react'
// import { useTheme } from './theme/ThemeProvider.jsx'
// import FileUpload from './components/FileUpload.jsx'
// import styled from 'styled-components'

// const AppContainer = styled.div`
//   min-height: 100vh;
//   background-color: ${props => props.theme.colors.background};
//   color: ${props => props.theme.colors.textPrimary};
//   transition: all 0.3s ease;
//   font-family: ${props => props.theme.typography.family.primary};
// `

// const MainContent = styled.main`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: ${props => props.theme.spacing.lg};
// `

// function App() {
//   const { currentTheme } = useTheme()
//   const [comparisonData, setComparisonData] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)

//   const handleComparisonComplete = (data) => {
//     setComparisonData(data)
//   }

//   const handleNewComparison = () => {
//     setComparisonData(null)
//   }

//   return (
//     <AppContainer theme={currentTheme}>
//       <MainContent theme={currentTheme}>
//         {!comparisonData ? (
//           <FileUpload 
//             onComparisonComplete={handleComparisonComplete}
//             isLoading={isLoading}
//             setIsLoading={setIsLoading}
//           />
//         ) : (
//           <div>
//             <h2>Comparison Results</h2>
//             <pre>{JSON.stringify(comparisonData, null, 2)}</pre>
//             <button onClick={handleNewComparison}>New Comparison</button>
//           </div>
//         )}
//       </MainContent>
//     </AppContainer>
//   )
// }

// export default App
// src/App.jsx




// import React, { useState } from 'react'
// import { useTheme } from './theme/ThemeProvider.jsx'
// import FileUpload from './components/FileUpload.jsx'
// // 1. IMPORT YOUR PROGRESSINDICATOR STORY
// import ProgressIndicator from './components/ProgressIndicator.jsx' 
// import styled from 'styled-components'

// // ... (Your styled components are perfect) ...
// const AppContainer = styled.div`...`
// const MainContent = styled.main`...`

// function App() {
//   const { currentTheme } = useTheme()
//   const [comparisonData, setComparisonData] = useState(null)
//   const [isLoading, setIsLoading] = useState(true) // This state is key

//   const handleComparisonComplete = (data) => {
//     setComparisonData(data)
//   }

//   const handleNewComparison = () => {
//     setComparisonData(null)
//   }

//   return (
//     <AppContainer theme={currentTheme}>
//       <MainContent theme={currentTheme}>
//         {/* 2. CHECK IF LOADING */}
//         {isLoading ? (

//           // 3. IF IT IS LOADING, SHOW YOUR STORY
//           <ProgressIndicator />

//         ) : !comparisonData ? (

//           // 4. IF NOT LOADING, SHOW THE FILE UPLOAD
//           <FileUpload 
//             onComparisonComplete={handleComparisonComplete}
//             isLoading={isLoading}
//             setIsLoading={setIsLoading} // This prop is important!
//           />
//         ) : (

//           // 5. IF DONE, SHOW THE RESULTS
//           <div>
//             <h2>Comparison Results</h2>
//             <pre>{JSON.stringify(comparisonData, null, 2)}</pre>
//             <button onClick={handleNewComparison}>New Comparison</button>
//           </div>
//         )}
//       </MainContent>
//     </AppContainer>
//   )
// }

// export default App







// import React, { useState } from 'react'
// import { useTheme } from './theme/ThemeProvider.jsx'
// import FileUpload from './components/FileUpload.jsx'
// import ProgressIndicator from './components/ProgressIndicator.jsx'
// import styled from 'styled-components'

// const AppContainer = styled.div`
//   min-height: 100vh;
//   background-color: ${props => props.theme.colors.background};
//   color: ${props => props.theme.colors.textPrimary};
//   transition: all 0.3s ease;
//   font-family: ${props => props.theme.typography.family.primary};
// `

// const MainContent = styled.main`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: ${props => props.theme.spacing.lg};
// `

// function App() {
//   const { currentTheme } = useTheme()
//   const [comparisonData, setComparisonData] = useState(null)
//   const [isLoading, setIsLoading] = useState(false) // Default is false

//   const handleComparisonComplete = (data) => {
//     setComparisonData(data)
//   }

//   const handleNewComparison = () => {
//     setComparisonData(null)
//   }

//   return (
//     <AppContainer theme={currentTheme}>
//       <MainContent theme={currentTheme}>
//         {isLoading ? (

//           // 1. If loading, show the progress indicator
//           // We MUST pass the theme prop here to prevent crash
//           <ProgressIndicator theme={currentTheme} />

//         ) : !comparisonData ? (

//           // 2. If not loading, show file upload
//           // We MUST pass the theme prop here to prevent crash
//           <FileUpload 
//             onComparisonComplete={handleComparisonComplete}
//             setIsLoading={setIsLoading} 
//             theme={currentTheme} 
//           />

//         ) : (

//           // 3. If done, show results
//           <div>
//             <h2>Comparison Results</h2>
//             <pre>{JSON.stringify(comparisonData, null, 2)}</pre>
//             <button onClick={handleNewComparison}>New Comparison</button>
//           </div>
//         )}
//       </MainContent>
//     </AppContainer>
//   )
// }

// export default App



// ...existing code...


// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react'
import FileUpload from './components/FileUpload.jsx'
import ComparisonOptions from './components/ComparisonOptions.jsx'
import ProgressIndicator from './components/ProgressIndicator.jsx'
import SubmitButton from './components/SubmitButton.jsx'
import ResultsDashboard from './components/ResultsDashboard.jsx'
import { useTheme } from './theme/ThemeProvider.jsx'
import styled from 'styled-components'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textPrimary};
  transition: all 0.3s ease;
  font-family: ${props => props.theme.typography.family.primary};
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['2xl']};
`

const DescriptiveTitle = styled.h2`
  color: ${props => props.theme.colors.primary || '#2563eb'};
  font-size: ${props => props.theme.typography.size['2xl']};
  font-weight: ${props => props.theme.typography.weight.semibold};
  margin-bottom: ${props => props.theme.spacing.xs};
`

const DescriptiveSubtitle = styled.p`
  color: ${props => props.theme.colors.primary || '#2563eb'};
  font-size: ${props => props.theme.typography.size.base};
  font-weight: ${props => props.theme.typography.weight.normal};
  margin-bottom: ${props => props.theme.spacing.md};
  opacity: 0.9;
`

const ErrorMessage = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: #fef2f2;
  color: #991b1b;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  border: 1px solid #fecaca;
  font-size: ${props => props.theme.typography.size.sm};
`

const ResultsContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
`

const ResultsTitle = styled.h2`
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.lg};
`

const ResultsContent = styled.pre`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow-x: auto;
  font-family: ${props => props.theme.typography.family.secondary};
  font-size: ${props => props.theme.typography.size.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.lg};
`

const DownloadLink = styled.a`
  display: inline-block;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.weight.medium};

  &:hover {
    opacity: 0.9;
  }
`

const ChangeList = styled.ul`
  list-style: none;
  padding-left: 0;
`

const ChangeItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.size.sm};
`

function App() {
  const { currentTheme } = useTheme()
  const [files, setFiles] = useState([])
  const [comparisonType, setComparisonType] = useState('full')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [comparisonData, setComparisonData] = useState(null)

  // ABASC-13: File Validation Logic
  const validateFiles = useCallback((fileList) => {
    const arxmlFiles = fileList.filter(f => f.name.toLowerCase().endsWith('.arxml'))
    const xsdFiles = fileList.filter(f => f.name.toLowerCase().endsWith('.xsd'))

    // Check for invalid file types
    const invalidFiles = fileList.filter(f =>
      !f.name.toLowerCase().endsWith('.arxml') && !f.name.toLowerCase().endsWith('.xsd')
    )
    if (invalidFiles.length > 0) {
      setError('Only .arxml and .xsd files are allowed')
      return false
    }

    // Schema Validation: Multiple ARXML files (2+) + 1 optional XSD
    if (comparisonType === 'schema') {
      if (arxmlFiles.length < 2) {
        setError('Schema Validation requires at least 2 ARXML files')
        return false
      }

      if (xsdFiles.length > 1) {
        setError('Maximum 1 XSD schema file is allowed')
        return false
      }

      setError(null)
      return true
    }

    // Full Comparison: Exactly 2 ARXML files + 1 optional XSD (max 3 files)
    if (comparisonType === 'full') {
      if (arxmlFiles.length !== 2) {
        setError('Full Comparison requires exactly 2 ARXML files')
        return false
      }

      if (xsdFiles.length > 1) {
        setError('Maximum 1 XSD schema file is allowed')
        return false
      }

      if (fileList.length > 3) {
        setError('Maximum 3 files allowed (2 ARXML + 1 optional XSD)')
        return false
      }

      setError(null)
      return true
    }

    setError(null)
    return true
  }, [comparisonType])

  // Re-validate files when comparison type changes
  useEffect(() => {
    if (files.length > 0) {
      validateFiles(files)
    }
  }, [comparisonType, files, validateFiles])

  // Vertical slice: upload two files and get summary + tree + Excel link
  const handleSubmit = async () => {
    if (!validateFiles(files)) {
      return
    }

    // For the vertical slice we only support full comparison of exactly 2 ARXML files
    const arxmlFiles = files.filter(f => f.name.toLowerCase().endsWith('.arxml'))
    if (arxmlFiles.length !== 2) {
      setError('Full Comparison requires exactly 2 ARXML files')
      return
    }

    const formData = new FormData()
    formData.append('file1', arxmlFiles[0])
    formData.append('file2', arxmlFiles[1])
    formData.append('comparison_mode', 'full')

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/jobs/full-comparison/', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to run comparison')
      }

      const data = await response.json()

      // Transform tree_data array into grouped details object
      const treeData = data.tree_data || []
      const details = {
        added: treeData.filter(item => item.Type === 'ADDED').map(item => ({ path: item.Path, ...item })),
        removed: treeData.filter(item => item.Type === 'REMOVED').map(item => ({ path: item.Path, ...item })),
        modified: treeData.filter(item => item.Type === 'MODIFIED').map(item => ({ path: item.Path, ...item }))
      }

      setComparisonData({
        summary: data.summary,
        details: details,
        // Prefix with dev server host for local testing; adjust as needed for prod
        excel_url: `http://127.0.0.1:8000${data.excel_url}`
      })
    } catch (err) {
      setError('Comparison failed: ' + err.message)
      console.error('API Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewComparison = () => {
    setFiles([])
    setComparisonType('full')
    setError(null)
    setComparisonData(null)
    setIsLoading(false)
  }

  // Check if submit should be disabled based on comparison type
  const getMinFilesRequired = () => {
    if (!comparisonType) return true // No comparison type selected

    if (comparisonType === 'full') {
      // Full Comparison: exactly 2 ARXML files required
      const arxmlFiles = files.filter(f => f.name.toLowerCase().endsWith('.arxml'))
      return arxmlFiles.length !== 2
    } else {
      // Schema Validation: at least 2 ARXML files required
      const arxmlFiles = files.filter(f => f.name.toLowerCase().endsWith('.arxml'))
      return arxmlFiles.length < 2
    }
  }

  const isSubmitDisabled = getMinFilesRequired() || isLoading || error !== null || !comparisonType

  return (
    <AppContainer>
      <MainContent>
        <Header>
          <DescriptiveTitle>
            AI-Powered AUTOSAR File Comparison
          </DescriptiveTitle>
          <DescriptiveSubtitle>
            Intelligent Semantic Analysis for Automotive Development
          </DescriptiveSubtitle>
        </Header>

        {isLoading ? (
          <ProgressIndicator />
        ) : comparisonData ? (
          <ResultsContainer theme={currentTheme}>
            <ResultsDashboard data={comparisonData} theme={currentTheme} />

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <SubmitButton onClick={handleNewComparison}>
                Start New Comparison
              </SubmitButton>
            </div>
          </ResultsContainer>
        ) : (
          <>
            {error && (
              <ErrorMessage>
                ⚠️ {error}
              </ErrorMessage>
            )}

            {/* Step 1: Select Comparison Type First */}
            <ComparisonOptions
              selectedOption={comparisonType}
              onOptionChange={(option) => {
                setComparisonType(option)
                // Clear files and error when switching comparison type
                setFiles([])
                setError(null)
              }}
            />

            {/* Step 2: Upload Files Based on Selected Comparison Type */}
            {comparisonType && (
              <FileUpload
                files={files}
                setFiles={setFiles}
                setError={setError}
                validateFiles={validateFiles}
                comparisonType={comparisonType}
              />
            )}

            {/* Step 3: Submit Button */}
            {files.length >= 2 && !error && (
              <SubmitButton
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
              >
                {isLoading
                  ? 'Processing...'
                  : comparisonType === 'schema'
                    ? 'Start Validation'
                    : 'Start Comparison'
                }
              </SubmitButton>
            )}
          </>
        )}
      </MainContent>
    </AppContainer>
  )
}

export default App