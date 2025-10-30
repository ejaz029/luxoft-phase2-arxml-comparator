// src/components/ProgressIndicator.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// ... (Your styled components are perfect) ...
const ProgressContainer = styled.div`...`;
const StatusText = styled.p`...`;
const ProgressBarOuter = styled.div`...`;
const ProgressBarInner = styled.div`...`;

// 1. Accept the 'theme' prop here
function ProgressIndicator({ theme }) {
  const [progress, setProgress] = useState(0);

  // ... (Your useEffect timer is perfect) ...
  useEffect(() => {
    // ...
  }, []);

  return (
    // 2. Pass the 'theme' prop to your styled components
    <ProgressContainer theme={theme}>
      <StatusText theme={theme}>
        Processing... {progress}%
      </StatusText>
      <ProgressBarOuter theme={theme}>
        <ProgressBarInner 
          theme={theme} 
          $progress={progress} 
        />
      </ProgressBarOuter>
    </ProgressContainer>
  );
}

export default ProgressIndicator;