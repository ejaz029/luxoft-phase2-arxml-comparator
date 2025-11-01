// // filepath: d:\luxoft-phase2-arxml-comparator\src\theme\ThemeProvider.jsx
// import React, { createContext, useContext, useMemo } from 'react';
// import { lightTheme } from './themes/light'; // Ensure this path is correct

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const currentTheme = lightTheme; // Set a default theme

//   const value = useMemo(() => ({ currentTheme }), [currentTheme]);

//   return (
//     <ThemeContext.Provider value={value}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   return useContext(ThemeContext);
// };



// src/theme/ThemeProvider.jsx
import { createContext, useContext, useMemo } from "react";
// We only import the light theme now
import { lightTheme } from "./themes/light";

// Import all your design tokens
import { BORDER_RADIUS } from './tokens/borderRadius';
import { SPACING } from './tokens/spacing';
import { TYPOGRAPHY } from './tokens/typography';
import { SHADOWS } from './tokens/shadows';
import { Z_INDEX } from './tokens/zIndex';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // useMemo prevents the theme object from being recreated on every render
  const currentTheme = useMemo(() => {
    // Combine colors with other tokens into one theme object
    return {
      ...lightTheme,
      typography: TYPOGRAPHY,
      spacing: SPACING,
      borderRadius: BORDER_RADIUS,
      shadows: SHADOWS,
      zIndex: Z_INDEX,
    };
  }, []); // Empty dependency array means this runs only once

  return (
    <ThemeContext.Provider value={{ currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
