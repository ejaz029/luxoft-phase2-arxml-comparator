// src/components/ComparisonOptions.jsx
import React from 'react';
import styled from 'styled-components';

// --- Styled Components ---
const OptionsContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.p`
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.size.base};

  &:last-child {
    margin-bottom: 0;
  }
`;

const RadioInput = styled.input`
  margin-right: ${({ theme }) => theme.spacing.sm};
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme }) => theme.colors.textDisabled};
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:checked {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: inset 0 0 0 3px ${({ theme }) => theme.colors.surface};
  }
`;

// --- React Component ---
function ComparisonOptions({ selectedOption, onOptionChange }) {
  return (
    <OptionsContainer>
      <Title>Comparison Options</Title>
      
      <RadioLabel>
        <RadioInput
          type="radio"
          name="comparisonType"
          value="full"
          checked={selectedOption === 'full'}
          onChange={() => onOptionChange('full')}
        />
        Full Comparison
      </RadioLabel>

      <RadioLabel>
        <RadioInput
          type="radio"
          name="comparisonType"
          value="schema"
          checked={selectedOption === 'schema'}
          onChange={() => onOptionChange('schema')}
        />
        Schema Validation Only
      </RadioLabel>
    </OptionsContainer>
  );
}

export default ComparisonOptions;