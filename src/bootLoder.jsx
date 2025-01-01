import { createRoot } from 'react-dom/client'
import Kernel from './services/kernel.jsx'
import './Theme.css'
createRoot(document.getElementById('display')).render(
  <Kernel />
)
