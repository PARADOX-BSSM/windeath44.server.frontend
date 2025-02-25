import { createRoot } from 'react-dom/client'
import Kernel from './services/kernel.jsx'
import './Theme.css'
createRoot(document.getElementById('display')).render(
  //커널 스크립트 호출
  <Kernel />
)
