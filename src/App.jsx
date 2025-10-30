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
import React, { useState } from 'react'
import { useTheme } from './theme/ThemeProvider.jsx'
import FileUpload from './components/FileUpload.jsx'
import ProgressIndicator from './components/ProgressIndicator.jsx'
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

const TestButton = styled.button`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  margin-bottom: ${props => props.theme.spacing.lg};

  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`

function App() {
  const { currentTheme } = useTheme()
  const [showProgress, setShowProgress] = useState(false)

  const handleTestProgress = () => {
    setShowProgress(true)
    // Reset after 5 seconds
    setTimeout(() => {
      setShowProgress(false)
    }, 5000)
  }

  return (
    <AppContainer theme={currentTheme}>
      <MainContent theme={currentTheme}>
        <TestButton 
          theme={currentTheme} 
          onClick={handleTestProgress}
        >
          Test Progress Indicator
        </TestButton>

        {showProgress && <ProgressIndicator theme={currentTheme} />}
      </MainContent>
    </AppContainer>
  );
}

export default App