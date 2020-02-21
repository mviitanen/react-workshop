import React, { createContext, useReducer, useEffect, useContext, useCallback } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AuthStateProvider } from 'YesterTech/AuthState'
import { ShoppingCartProvider } from 'YesterTech/ShoppingCartState'
import PrimaryLayout from 'YesterTech/PrimaryLayout'
import 'YesterTech/styles/global-styles.scss'

const AnalyticsContext = createContext()

const initialState = {
  deferredEvents: [],
  user: null,
  status: 'noUser', // or 'user'
  prevStatus: 'noUser',
}

function analyticsReducer(state, action) {
  if (action.type === 'TELEMETRY') {
    if (state.status === 'noUser') {
      return {
        ...state,
        deferredEvents: [...state.deferredEvents, action],
      }
    }

    return state
  } else if (action.type === 'USER') {
    return {
      ...state,
      user: action.user,
      status: 'user',
      prevStatus: state.status,
    }
  }
}

// service.measure(...)
function AnalyticsProvider({ children, service }) {
  const [state, dispatch] = useReducer(analyticsReducer, initialState)

  useEffect(() => {
    if (state.status === 'user' && state.prevStatus === 'noUser') {
      state.deferredEvents.forEach(event => {
        service.measure({
          ...event,
          user: state.user,
        })
      })
    }
  }, [state.status])

  return (
    <AnalyticsContext.Provider
      value={{
        dispatch,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

const fakeService = {
  measure: event => console.log(event),
}

export function useAnalytics() {
  const { dispatch } = useContext(AnalyticsContext)

  const sendAnalytics = useCallback(data => {
    dispatch({
      type: 'TELEMETRY',
      time: Date.now(),
      data,
    })
  }, [])

  return sendAnalytics
}

export function useMountAnalytics(name) {
  const sendTelemetry = useAnalytics()

  useEffect(() => {
    sendTelemetry({ on: 'mount', name })

    return () => {
      sendTelemetry({ on: 'unmount', name })
    }
  }, [])
}

function UserButton() {
  const { dispatch } = useContext(AnalyticsContext)

  return (
    <button
      onClick={() => {
        dispatch({
          type: 'USER',
          user: { name: 'David' },
        })
      }}
    >
      Get the user!
    </button>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AnalyticsProvider service={fakeService}>
        <UserButton />
        <AuthStateProvider>
          <ShoppingCartProvider>
            <PrimaryLayout />
          </ShoppingCartProvider>
        </AuthStateProvider>
      </AnalyticsProvider>
    </BrowserRouter>
  )
}

export default App
