import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AuthStateProvider } from 'YesterTech/AuthState'
import { ShoppingCartProvider } from 'YesterTech/ShoppingCartState'
import PrimaryLayout from './PrimaryLayout'
import 'YesterTech/styles/global-styles.scss'

function App() {
  return (
    <AuthStateProvider>
      <ShoppingCartProvider>
        <BrowserRouter>
          <PrimaryLayout />
        </BrowserRouter>
      </ShoppingCartProvider>
    </AuthStateProvider>
  )
}

export default App
