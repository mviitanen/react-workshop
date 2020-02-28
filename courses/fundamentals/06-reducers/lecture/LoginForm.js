import React, { useState, useReducer } from 'react'
import {
  FaSignInAlt,
  FaExclamationCircle,
} from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import Notice from 'YesterTech/Notice'
import Centered from 'YesterTech/Centered'
import api from 'YesterTech/api'

function LoginForm({ onAuthenticated }) {
  let [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOGIN_START':
          return {
            ...state,
            loading: true,
            user: null,
            error: null,
          }
        case 'LOGIN_SUCCESS':
          return {
            ...state,
            user: action.user,
            loading: false,
          }
        case 'LOGIN_FAILURE':
          return {
            ...state,
            error: action.error,
            loading: false,
          }
        case 'TOGGLE_PASSWORD':
          return {
            ...state,
            showPassword: !state.showPassword,
          }
        case 'CHANGE_FIELD':
          return {
            ...state,
            [action.name]: action.value,
          }
        default:
          return state
      }
    },
    {
      user: null,
      loading: false,
      error: null,
      showPassword: false,
      username: '',
      password: '',
    }
  )

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let { loading, error, showPassword } = state

  function changeField(e) {
    dispatch({
      type: 'CHANGE_FIELD',
      name: e.target.name,
      value: e.target.value,
    })
  }

  function handleLogin(event) {
    event.preventDefault()

    dispatch({ type: 'LOGIN_START' })

    api.auth
      .login(username, password)
      .then(user => {
        // if (typeof onAuthenticated === 'function') {
        //   onAuthenticated(user)
        // }
        dispatch({ type: 'LOGIN_SUCCESS', user })
      })
      .catch(error => {
        dispatch({ type: 'LOGIN_FAILURE', error })
      })
  }

  return (
    <Centered className="spacing">
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}

        <div className="form-field">
          <input
            aria-label="Username"
            name="username"
            onChange={changeField}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="form-field">
          <input
            aria-label="Password"
            name="password"
            onChange={changeField}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <label>
            <input
              onChange={() =>
                dispatch({ type: 'TOGGLE_PASSWORD' })
              }
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{' '}
            show password
          </label>
        </div>

        <footer>
          <button type="submit" className="button">
            {!loading ? (
              <>
                <FaSignInAlt /> <span>Login</span>
              </>
            ) : (
              <span>Loading ...</span>
            )}
          </button>
        </footer>
      </form>
    </Centered>
  )
}

export default LoginForm
