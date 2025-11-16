import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@radix-ui/themes/styles.css";
import App from './App.tsx'
import { Theme } from '@radix-ui/themes/dist/cjs/components/index.js';
import { AuthProvider } from './lib/AuthProvider'

try {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('Root element not found!')
  }

  createRoot(rootElement).render(
    <StrictMode>
      <Theme>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Theme>
    </StrictMode>,
  )
} catch (error) {
  console.error('Failed to render app:', error)
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1>Error Loading App</h1>
      <p>${error instanceof Error ? error.message : String(error)}</p>
      <p>Check the console for more details.</p>
    </div>
  `
}
