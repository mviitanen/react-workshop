import React, { useState, useReducer } from 'react'
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from 'react-router-dom'
import Centered from 'YesterTech/Centered'

// To run the final solution: Comment this in and the rest out
// import Checkout from './Checkout.final'
// export default Checkout

// Route Targets
import ViewCart from 'YesterTech/ViewCart'
import CheckoutBilling from './CheckoutBilling'
import CheckoutReview from 'YesterTech/CheckoutReview'

const Checkout: React.FC = () => {
  const match = useRouteMatch()
  const history = useHistory()

  function handleBillingSubmit(
    sameAsBilling: boolean,
    fields: Fields
  ) {
    console.log(sameAsBilling, fields)
    history.push(`${match.path}/review`)
  }

  return (
    <Centered>
      <Switch>
        <Route path={`${match.path}/cart`} exact>
          <ViewCart />
        </Route>
        <Route path={`${match.path}/billing`}>
          <CheckoutBilling onSubmit={handleBillingSubmit} />
        </Route>

        {/*
          Hint: We shouldn't be able to visit this route unless we have
          values inside of our state for `fields`. See the README
        */}
        <Route path={`${match.path}/review`}>
          {/* The README also tells you what props you need to pass into CheckoutReview */}
          <CheckoutReview />
        </Route>

        <Redirect to={`${match.path}/cart`} />
      </Switch>
    </Centered>
  )
}

export default Checkout

type CheckoutEvents = {
  type: 'SUBMIT_BILLING'
  fields: Fields
  sameAsBilling: boolean
}

type Fields = {
  [key: string]: string
}

type CheckoutState = {
  sameAsBilling: boolean
  fields: Fields
}
