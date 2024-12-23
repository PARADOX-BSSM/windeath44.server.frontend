import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Kernel from './services/kernel.jsx'
createRoot(document.getElementById('display')).render(
  <StrictMode>
    <Kernel />
  </StrictMode>,
)
