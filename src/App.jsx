import React, { useState } from 'react'
import { useTheme } from './theme/ThemeProvider.jsx'
import FileUpload from './components/FileUpload.jsx'
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

function App() {
  const { currentTheme } = useTheme()
  const [comparisonData, setComparisonData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleComparisonComplete = (data) => {
    setComparisonData(data)
  }

  const handleNewComparison = () => {
    setComparisonData(null)
  }

  return (
    <AppContainer theme={currentTheme}>
      <MainContent theme={currentTheme}>
        {!comparisonData ? (
          <FileUpload 
            onComparisonComplete={handleComparisonComplete}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <div>
            <h2>Comparison Results</h2>
            <pre>{JSON.stringify(comparisonData, null, 2)}</pre>
            <button onClick={handleNewComparison}>New Comparison</button>
          </div>
        )}
      </MainContent>
    </AppContainer>
  )
}

export default App
