import React, { useRef } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import Centered from 'YesterTech/Centered'
import api from 'YesterTech/api'

function LoginForm({ onAuthenticated }) {
  const usernameRef = useRef()
  const passwordRef = useRef()

  function handleLogin(event) {
    event.preventDefault()

    api.auth.login(usernameRef.current.value, passwordRef.current.value).then(user => {
      if (typeof onAuthenticated === 'function') {
        onAuthenticated(user)
      }
    })
  }

  return (
    <Centered className="spacing">
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
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
            type="text"
            placeholder="Password"
          />
        </div>

        <footer>
          <button type="submit" className="button">
            <span>Loading ...</span>
          </button>
        </footer>
      </form>
    </Centered>
  )
}

export default LoginForm
