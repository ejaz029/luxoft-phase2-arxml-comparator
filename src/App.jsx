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
import Login from './components/Login.jsx'
import { useTheme } from './theme/ThemeProvider.jsx'
import { useAuth } from './contexts/AuthContext'
import { LogOut } from 'lucide-react'
import styled from 'styled-components'

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.background} 0%, ${props => props.theme.colors.primaryLight || '#f0f9ff'} 100%);
  color: ${props => props.theme.colors.textPrimary};
  transition: all 0.3s ease;
  font-family: ${props => props.theme.typography.family.primary};
  position: relative;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(37, 99, 235, 0.03) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  position: relative;
  z-index: 1;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['2xl']};
`

const DescriptiveTitle = styled.h2`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary || '#2563eb'} 0%, ${props => props.theme.colors.primaryLight || '#60a5fa'} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #991b1b;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  border: 2px solid #fecaca;
  font-size: ${props => props.theme.typography.size.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &::before {
    content: '⚠️';
    font-size: 1.2em;
  }
`

const ResultsContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(37, 99, 235, 0.1);
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
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

const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`

const LogoutButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.size.sm};
  font-weight: ${props => props.theme.typography.weight.medium};
  background-color: transparent;
  color: ${props => props.theme.colors.textSecondary};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  &:hover {
    background-color: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.textPrimary};
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`

function App() {
  const { currentTheme } = useTheme()
  const { isAuthenticated, isLoading: authLoading, logout, apiClient } = useAuth()
  const [originalFile, setOriginalFile] = useState(null)
  const [updatedFile, setUpdatedFile] = useState(null)
  const [comparisonType, setComparisonType] = useState('full')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [comparisonData, setComparisonData] = useState(null)

  // Validate that both files are present
  const validateFiles = useCallback(() => {
    if (!originalFile || !updatedFile) {
      setError('Both original and updated files are required')
      return false
    }

    if (!originalFile.name.toLowerCase().endsWith('.arxml')) {
      setError('Original file must be an .arxml file')
      return false
    }

    if (!updatedFile.name.toLowerCase().endsWith('.arxml')) {
      setError('Updated file must be an .arxml file')
      return false
    }

    setError(null)
    return true
  }, [originalFile, updatedFile])

  // Vertical slice: upload two files and get summary + tree + Excel link
  const handleSubmit = async () => {
    if (!originalFile || !updatedFile) {
      setError('Please select both original and updated files')
      return
    }

    if (!validateFiles()) {
      return
    }

    const formData = new FormData()
    formData.append('file1', originalFile)
    formData.append('file2', updatedFile)
    formData.append('comparison_mode', 'full')

    setIsLoading(true)
    setError(null)

    try {
      // Don't set Content-Type manually - axios will set it automatically with boundary for FormData
      const response = await apiClient.post('/jobs/full-comparison/', formData)

      const data = response.data

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
      console.error('API Error:', err)
      console.error('Error response:', err.response)
      console.error('Error status:', err.response?.status)
      
      // Handle 401 specifically - token might be expired or missing
      if (err.response?.status === 401) {
        const errorMessage = err.response?.data?.detail || 'Authentication failed. Please log in again.'
        setError(errorMessage)
        // If token is invalid, the interceptor should handle refresh, but if that fails, logout
        if (err.response?.data?.code === 'token_not_valid' || !localStorage.getItem('access_token')) {
          logout()
        }
      } else {
        const errorMessage = err.response?.data?.error || err.response?.data?.detail || err.message || 'Failed to run comparison'
        setError('Comparison failed: ' + errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewComparison = () => {
    setOriginalFile(null)
    setUpdatedFile(null)
    setComparisonType('full')
    setError(null)
    setComparisonData(null)
    setIsLoading(false)
  }

  // Check if submit should be disabled - both files must be present
  const isSubmitDisabled = !originalFile || !updatedFile || isLoading || error !== null || !comparisonType

  // Show login if not authenticated
  if (authLoading) {
    return (
      <AppContainer>
        <MainContent>
          <ProgressIndicator />
        </MainContent>
      </AppContainer>
    )
  }

  if (!isAuthenticated) {
    return <Login />
  }

  if (authLoading) {
    return <ProgressIndicator />
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <AppContainer>
      <MainContent>
        <HeaderActions theme={currentTheme}>
          <div>
            <DescriptiveTitle>
              AI-Powered AUTOSAR File Comparison
            </DescriptiveTitle>
            <DescriptiveSubtitle>
              Intelligent Semantic Analysis for Automotive Development
            </DescriptiveSubtitle>
          </div>
          <LogoutButton theme={currentTheme} onClick={logout}>
            <LogOut size={16} />
            <span>Logout</span>
          </LogoutButton>
        </HeaderActions>

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
                setOriginalFile(null)
                setUpdatedFile(null)
                setError(null)
              }}
            />

            {/* Step 2: Upload Files Based on Selected Comparison Type */}
            {comparisonType && (
              <FileUpload
                originalFile={originalFile}
                setOriginalFile={setOriginalFile}
                updatedFile={updatedFile}
                setUpdatedFile={setUpdatedFile}
                setError={setError}
              />
            )}

            {/* Step 3: Submit Button */}
            {originalFile && updatedFile && !error && (
              <SubmitButton
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
              >
                {isLoading
                  ? 'Processing...'
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