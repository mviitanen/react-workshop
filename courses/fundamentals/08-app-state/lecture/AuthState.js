import React, { createContext, useContext, useReducer } from 'react'

const AuthStateContext = createContext()

const initialState = {
  authenticated: false,
  user: null,
}

export function AuthStateProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'LOGIN': {
        // {
        //   type: 'LOGIN',
        //   user: {...}
        // }
        return { ...state, authenticated: true, user: action.user }
      }
      case 'LOGOUT': {
        return initialState
      }
      default:
        return state
    }
  }, initialState)

  const value = {
    // authenticated: ...
    // user: ...
    // dispatch: () => {}
    ...state,
    dispatch,
  }

  return <AuthStateContext.Provider value={value} children={children} />
}

export function useAuthState() {
  return useContext(AuthStateContext)
}
