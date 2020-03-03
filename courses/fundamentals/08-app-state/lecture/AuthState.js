import React, { useContext, createContext, useReducer } from 'react'

const AuthStateContext = createContext()

const initialState = {
  authenticated: false,
  user: null
}

export function AuthStateProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'LOGIN': {
        return { ...state, authenticated: true, user: action.user }
      }
      case 'LOGOUT': {
        return { ...initialState }
      }
      default:
        return state
    }
  }, initialState)

  const value = {
    ...state,
    dispatch
  }

  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  )
}

export function useAuthState() {
  // {state, dispatch}
  return useContext(AuthStateContext)
}
