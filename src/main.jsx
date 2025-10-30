// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import { ThemeProvider } from './theme/ThemeProvider.jsx'
// import './theme/GlobalStyles.js'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ThemeProvider>
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>,
// )
// src/main.jsx
// src/main.jsx
// src/main.jsx




// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import { ThemeProvider, useTheme } from './theme/ThemeProvider.jsx' // Make sure useTheme is imported
// import GlobalStyles from './theme/GlobalStyles.js' // Import as a component

// // This helper component is necessary to access the theme
// // and pass it to GlobalStyles and App
// const AppWithTheme = () => {
//   // 1. This hook now works because it's INSIDE ThemeProvider
//   const { currentTheme } = useTheme(); 
  
//   return (
//     <>
//       {/* 2. GlobalStyles now receives the theme and will work */}
//       <GlobalStyles theme={currentTheme} />
      
//       {/* 3. Your App.jsx component also receives the theme */}
//       <App />
//     </>
//   );
// };

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ThemeProvider>
//       {/* 4. We render the helper, not App directly */}
//       <AppWithTheme />
//     </ThemeProvider>
//   </React.StrictMode>,
// )

// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider, useTheme } from './theme/ThemeProvider.jsx'
import GlobalStyles from './theme/GlobalStyles.js'

// This helper component is necessary to access the theme
// and pass it to GlobalStyles and App
const AppWithTheme = () => {
  const { currentTheme } = useTheme(); 
  
  return (
    <>
      <GlobalStyles theme={currentTheme} />
      {/* We don't need to pass theme to App here anymore, 
        because your new App.jsx calls useTheme() itself.
      */}
      <App />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  </React.StrictMode>,
)