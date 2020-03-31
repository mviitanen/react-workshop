import React, { useContext, useReducer, useCallback } from 'react'
import { UserNoId } from 'YesterTech/types'

export enum AuthActionTypes {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

const AuthStateContext = React.createContext({} as AuthContext)

const initialState: AuthState = {
  authenticated: false,
  user: null,
}

export const AuthStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer((state: AuthState, action: AuthActions): AuthState => {
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
    dispatch: useCallback(dispatch, []),
  }

  return <AuthStateContext.Provider value={value} children={children} />
}

export function useAuthState() {
  return useContext(AuthStateContext)
}

// Types

type AuthState = {
  authenticated: boolean
  user: null | UserNoId
}

type AuthContext = AuthState & {
  dispatch: React.Dispatch<AuthActions>
}

type AuthActions =
  | {
      type: AuthActionTypes.Login
      user: UserNoId
    }
  | {
      type: AuthActionTypes.Logout
    }
