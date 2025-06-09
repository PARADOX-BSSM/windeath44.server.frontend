import { createRoot } from 'react-dom/client'
import Kernel from './services/kernel.tsx'
import './Theme.css'

createRoot(document.getElementById('display') as HTMLElement).render(
  //커널 스크립트 호출
    <Kernel />
)
