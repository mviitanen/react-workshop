import React, { useReducer } from 'react'
import { Switch, Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom'
import Centered from 'YesterTech/Centered'

// Route Targets
import ViewCart from 'YesterTech/ViewCart'
import CheckoutBilling from 'YesterTech/CheckoutBilling'
import CheckoutReview from 'YesterTech/CheckoutReview'

export enum CheckoutActionTypes {
  SubmitBilling = 'SUBMIT_BILLING',
}

const Checkout: React.FC = () => {
  const match = useRouteMatch()
  const history = useHistory()

  const [state, dispatch] = useReducer(
    (state: CheckoutState, action: CheckoutActions): CheckoutState => {
      switch (action.type) {
        case CheckoutActionTypes.SubmitBilling: {
          const { sameAsBilling, fields } = action
          return { ...state, sameAsBilling: !!sameAsBilling, fields }
        }
        default:
          return state
      }
    },
    {
      sameAsBilling: false,
      fields: {},
    }
  )

  function handleBillingSubmit(sameAsBilling: boolean, fields: any) {
    dispatch({ type: CheckoutActionTypes.SubmitBilling, sameAsBilling, fields })
    history.push(`${match.path}/review`)
  }

  return (
    <Centered>
      <Switch>
        <Route path={`${match.path}/cart`} exact>
          <ViewCart />
        </Route>
        <Route path={`${match.path}/billing`}>
          <CheckoutBilling
            onSubmit={handleBillingSubmit}
            defaultSameAsBilling={state.sameAsBilling}
            defaultFields={state.fields}
          />
        </Route>
        {Object.keys(state.fields).length > 0 && (
          <Route path={`${match.path}/review`}>
            <CheckoutReview sameAsBilling={state.sameAsBilling} fields={state.fields} />
          </Route>
        )}
        <Redirect to={`${match.path}/cart`} />
      </Switch>
    </Centered>
  )
}

export default Checkout

// Types

type CheckoutActions = {
  type: CheckoutActionTypes.SubmitBilling
  sameAsBilling: boolean | null | undefined
  fields: CheckoutFields
}

type CheckoutState = {
  sameAsBilling: boolean
  fields: CheckoutFields
}

export type CheckoutFields = {
  [key: string]: string
}
