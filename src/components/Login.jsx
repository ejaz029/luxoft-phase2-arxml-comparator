import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import styled, { keyframes } from 'styled-components'
import { useTheme } from '../theme/ThemeProvider'
import { Lock, User } from 'lucide-react'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.primaryLight || '#e0f2fe'} 100%);
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(37, 99, 235, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`

const LoginCard = styled.div`
  width: 100%;
  max-width: 420px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(37, 99, 235, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;
  z-index: 1;
  
  &:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease;
  }
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.size['2xl']};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryLight || '#60a5fa'} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  line-height: 1.6;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const InputIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.2s ease;
`

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => `calc(${theme.spacing.md} + 24px + ${theme.spacing.sm})`};
  font-size: ${({ theme }) => theme.typography.size.base};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    
    ~ ${InputIcon} {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.6;
  }
`

const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #991b1b;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid #fecaca;
  font-size: ${({ theme }) => theme.typography.size.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  animation: ${fadeIn} 0.3s ease-out;
  
  &::before {
    content: '⚠️';
    font-size: 1.2em;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryLight || '#3b82f6'} 100%);
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px -2px rgba(37, 99, 235, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

function Login() {
  const { login } = useAuth()
  const { currentTheme } = useTheme()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(username, password)

    if (!result.success) {
      setError(result.error)
      setIsLoading(false)
    }
    // If successful, the AuthContext will update isAuthenticated
    // and the App component will handle the redirect
  }

  return (
    <LoginContainer theme={currentTheme}>
      <LoginCard theme={currentTheme}>
        <Title theme={currentTheme}>ARXML Comparator</Title>
        <Subtitle theme={currentTheme}>
          Please sign in to access the comparison tool
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          {error && (
            <ErrorMessage theme={currentTheme}>
              <span>{error}</span>
            </ErrorMessage>
          )}

          <FormGroup theme={currentTheme}>
            <Label theme={currentTheme} htmlFor="username">
              Username
            </Label>
            <InputWrapper>
              <InputIcon theme={currentTheme}>
                <User size={18} />
              </InputIcon>
              <Input
                theme={currentTheme}
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
                autoComplete="username"
                placeholder="Enter your username"
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup theme={currentTheme}>
            <Label theme={currentTheme} htmlFor="password">
              Password
            </Label>
            <InputWrapper>
              <InputIcon theme={currentTheme}>
                <Lock size={18} />
              </InputIcon>
              <Input
                theme={currentTheme}
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
              />
            </InputWrapper>
          </FormGroup>

          <SubmitButton
            theme={currentTheme}
            type="submit"
            disabled={isLoading || !username || !password}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </SubmitButton>
        </Form>
      </LoginCard>
    </LoginContainer>
  )
}

export default Login

