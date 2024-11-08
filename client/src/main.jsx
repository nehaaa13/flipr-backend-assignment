import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ProductContextProvider } from './context/ProductContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <ProductContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductContextProvider>
  </AuthContextProvider>
  </StrictMode>
)
