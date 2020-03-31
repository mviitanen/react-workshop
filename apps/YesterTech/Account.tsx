import React from 'react'
import Heading from 'YesterTech/Heading'
import { useAuthState } from 'YesterTech/AuthState'

const Account: React.FC = () => {
  const { user } = useAuthState()
  return (
    <div className="spacing">
      <Heading>My Account</Heading>
      <div>
        Welcome to your account management page{user && user.name && `, ${user.name}`}.
        Unfortunately, we have not finished it yet.{' '}
        <span role="img" aria-label="sad face emoji">
          😟
        </span>
      </div>
    </div>
  )
}

export default Account
