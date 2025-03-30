import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from "react-router";
import { AuthContextProvider } from "./contexts/AuthContext"
import { CartItemsContextProvider } from './contexts/CartItemsContext';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='/fleurissant'>
    <StrictMode>
      <AuthContextProvider>
        <CartItemsContextProvider>
          <App />
        </CartItemsContextProvider>
      </AuthContextProvider>
    </StrictMode>
  </BrowserRouter>
)
