import React, { useState } from 'react'
import { BrowserRouter as BrowserRouterProvider } from 'react-router-dom'
import PrimaryLayout from './PrimaryLayout'
import { ShoppingCartProvider } from './ShoppingCartState'
import 'YesterTech/styles/global-styles.scss'

function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouterProvider>
        <PrimaryLayout />
      </BrowserRouterProvider>
    </ShoppingCartProvider>
  )
}

export default App
