import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { PortfolioProvider } from './context/PortfolioContext.jsx'
import { NoticeProvider } from './context/NoticeContext.jsx'
import { NavGuardProvider } from './context/NavGuardContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PortfolioProvider>
        <NoticeProvider>
          <NavGuardProvider>
            <App />
          </NavGuardProvider>
        </NoticeProvider>
      </PortfolioProvider>
    </BrowserRouter>
  </StrictMode>,
);
