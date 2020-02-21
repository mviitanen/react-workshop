import React, { useState, useReducer, createContext } from 'react'
import { Switch, Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom'
import Centered from 'YesterTech/Centered'

// To run the final solution: Comment this in and the rest out
// import Checkout from './Checkout.final'
// export default Checkout

// Route Targets
import ViewCart from 'YesterTech/ViewCart'
import CheckoutBilling from './CheckoutBilling'
import CheckoutReview from 'YesterTech/CheckoutReview'

function checkoutReducer(state, action) {
  switch (action.type) {
    case 'SUBMIT_BILLING': {
      return {
        ...state,
        sameAsBilling: action.sameAsBilling,
        fields: action.fields,
      }
    }
    default:
      return state
  }
}

const initialState = {
  sameAsBilling: false,
  fields: {},
}

export const BillingContext = createContext()

function Checkout() {
  const match = useRouteMatch()
  const history = useHistory()

  // State is lifted up to here
  const [state, dispatch] = useReducer(checkoutReducer, initialState)

  function handleBillingSubmit(sameAsBilling, fields) {
    dispatch({
      type: 'SUBMIT_BILLING',
      sameAsBilling,
      fields,
    })

    history.push(`${match.path}/review`)
  }

  return (
    <BillingContext.Provider
      value={{
        ...state,
        handleBillingSubmit,
      }}
    >
      <Centered>
        <Switch>
          <Route path={`${match.path}/cart`} exact>
            <ViewCart />
          </Route>
          <Route path={`${match.path}/billing`}>
            {/* Should look like:
            <CheckoutBilling onSubmit={...} />
          */}
            <CheckoutBilling />
          </Route>

          {Object.keys(state.fields).length > 0 && (
            <Route path={`${match.path}/review`}>
              <CheckoutReview sameAsBilling={state.sameAsBilling} fields={state.fields} />
            </Route>
          )}

          <Redirect to={`${match.path}/cart`} />
        </Switch>
      </Centered>
    </BillingContext.Provider>
  )
}

export default Checkout
