import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../global.css"

import RouterApp from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterApp />
  </StrictMode>,
)
