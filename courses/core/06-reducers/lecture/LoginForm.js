import React, { useState, useReducer } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import Notice from 'YesterTech/Notice'
import Centered from 'YesterTech/Centered'
import api from 'YesterTech/api'

function LoginForm({ onAuthenticated }) {
  const usernameRef = useRef()
  const passwordRef = useRef()

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  function handleLogin(event) {
    event.preventDefault()

    api.auth.login(usernameRef.current.value).then(user => {
      if (typeof onAuthenticated === 'function') {
        onAuthenticated(user)
      }
    })
  }

  function changeField(field, value) {
    dispatch({ type: 'CHANGE_FIELD', field, value })
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
            ref={usernameRef}
            aria-label="Username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="form-field">
          <input
            ref={passwordRef}
            aria-label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <label>
            <input
              onChange={() => {
                dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })
              }}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{' '}
            show password
          </label>
        </div>

        <footer>
          <button type="submit" className="button" disabled={loading}>
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
