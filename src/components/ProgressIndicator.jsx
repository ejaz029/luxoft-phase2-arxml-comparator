
// src/components/ProgressIndicator.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// --- Styled Components ---
const ProgressContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const StatusText = styled.p`
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProgressBarOuter = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const ProgressBarInner = styled.div`
  height: 100%;
  width: ${props => props.$progress}%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.5s ease-in-out;
`;

// --- React Component ---
function ProgressIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(10);
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(timer);
          return 90;
        }
        return prev + Math.floor(Math.random() * 10) + 5;
      });
    }, 800); 
    return () => clearInterval(timer);
  }, []); 

  return (
    <ProgressContainer>
      <StatusText>
        Processing... {progress}%
      </StatusText>
      <ProgressBarOuter>
        <ProgressBarInner $progress={progress} />
      </ProgressBarOuter>
    </ProgressContainer>
  );
}

export default ProgressIndicator;