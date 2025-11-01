// src/components/SubmitButton.jsx
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
  }
`;

function SubmitButton({ children, ...props }) {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
}

export default SubmitButton;