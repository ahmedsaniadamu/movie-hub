import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryProvider } from './components/providers/QueryProvider.tsx'
import { ThemeProvider } from './components/providers/ThemeProvider.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="movie-hub-theme">
        <QueryProvider>
          <App />
        </QueryProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
