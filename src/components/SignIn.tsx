import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Heading, Text } from '@radix-ui/themes'
import { useAuth } from '../lib/useAuth'
import { AnimatedEventIcons } from './AnimatedEventIcons'
import { Calendar } from 'lucide-react'

export function SignIn() {
  const navigate = useNavigate()
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
      } else {
        navigate('/')
      }
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Column - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-8">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <Heading size="8" mb="2">Get Started</Heading>
            <Text size="3" color="gray">
              Sign in to get unlimited design request access
            </Text>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Text size="2" weight="medium" mb="2" as="div">Email</Text>
              <TextField.Root
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@example.com"
                required
                size="3"
              />
            </div>

            <div>
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
              <div>
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
              <Text size="2" color="red" as="div">
                {error}
              </Text>
            )}

            {successMessage && (
              <Text size="2" color="green" as="div">
                {successMessage}
              </Text>
            )}

            <Button type="submit" size="3" style={{ width: '100%' }} disabled={loading}>
              {loading
                ? (isSignUp ? 'Creating account...' : 'Signing in...')
                : (isSignUp ? 'Sign Up' : 'Sign In')
              }
            </Button>

            <div className="text-center pt-4">
              <Text size="2" color="gray">
                By clicking continue, you agree to our{' '}
                <a href="#" className="text-gray-900 underline">Terms and Conditions</a>
                {' '}and{' '}
                <a href="#" className="text-gray-900 underline">Privacy Policy</a>
              </Text>
            </div>

            <div className="text-center pt-2">
              <Text size="2">
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
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </Text>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column - Animated Icons */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <div className="mb-12 h-96">
            <AnimatedEventIcons />
          </div>

          <div className="text-center max-w-md">
            <Heading size="8" mb="4" className="text-white">
              Discover Events in Your Area
            </Heading>
            <Text size="4" className="text-white/90">
              UniMeet connects you with exciting events happening around campus.
              From study groups to social gatherings, find activities that match your interests.
            </Text>

            <div className="flex gap-2 justify-center mt-8">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

