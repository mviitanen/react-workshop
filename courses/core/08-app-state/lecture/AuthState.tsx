import React, { useContext, useReducer } from 'react'
import { UserNoId } from 'YesterTech/types'

export enum AuthActionTypes {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

const AuthStateContext = React.createContext<AuthContext>({
  dispatch: () => void null,
  authenticated: false,
  user: null,
})

const initialState: AuthState = {
  authenticated: false,
  user: null,
}

export const AuthStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = {
    ...state,
    dispatch,
  }

  return (
    <AuthStateContext.Provider value={value} children={children} />
  )
}

export function useAuthState() {
  return useContext(AuthStateContext)
}

function reducer(state: AuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return { ...state, authenticated: true, user: action.user }
    }
    case AuthActionTypes.Logout: {
      return { ...initialState }
    }
    default:
      return state
  }
}

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
