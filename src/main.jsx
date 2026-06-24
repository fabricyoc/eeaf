import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StudentsProvider } from './contexts/StudentsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentsProvider>
      <App />
    </StudentsProvider>
  </StrictMode>,
)
