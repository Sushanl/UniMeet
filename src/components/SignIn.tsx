import { useState } from 'react'
import { Button, TextField, Card, Heading, Text } from '@radix-ui/themes'
import { useAuth } from '../lib/authContext'

export function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setLoading(true)

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      const { error } = await signUp(email, password)

      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        setSuccessMessage('Account created! Please check your email to verify your account.')
        setLoading(false)
      }
    } else {
      const { error } = await signIn(email, password)

      if (error) {
        setError(error.message)
        setLoading(false)
      }
      // On success, auth state updates automatically and App.tsx will show the main content
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md p-6 bg-white">
        <Heading size="6" mb="4">{isSignUp ? 'Create Account' : 'Sign In'}</Heading>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <Text size="2" weight="medium" mb="2" as="div">Email</Text>
            <TextField.Root
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              size="3"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <Text size="2" weight="medium" mb="2" as="div">Password</Text>
            <TextField.Root
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              size="3"
            />
          </div>

          {isSignUp && (
            <div style={{ marginBottom: '1.5rem' }}>
              <Text size="2" weight="medium" mb="2" as="div">Confirm Password</Text>
              <TextField.Root
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                size="3"
              />
            </div>
          )}

          {error && (
            <Text size="2" color="red" mb="3" as="div">
              {error}
            </Text>
          )}

          {successMessage && (
            <Text size="2" color="green" mb="3" as="div">
              {successMessage}
            </Text>
          )}

          <Button type="submit" size="3" style={{ width: '100%' }} disabled={loading}>
            {loading 
              ? (isSignUp ? 'Creating account...' : 'Signing in...') 
              : (isSignUp ? 'Create Account' : 'Sign In')
            }
          </Button>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Text size="2" as="div">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError(null)
                  setSuccessMessage(null)
                  setPassword('')
                  setConfirmPassword('')
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-9)',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </Text>
          </div>
        </form>
      </Card>
    </div>
  )
}

