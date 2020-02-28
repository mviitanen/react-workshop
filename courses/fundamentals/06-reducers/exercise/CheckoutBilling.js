import React, { useState, useReducer } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import Heading from 'YesterTech/Heading'

function promiseMiddleware(reducer) {
  return (state, action) => {
    if (action instanceof Promise) {
      reducer(state, { type: 'PROMISE_START' })
      action.then(result => {
        reducer(state, { type: 'PROMISE_END', result })
      })
    }

    return reducer(state, action)
  }
}

function logMiddleware(reducer) {
  return (state, action) => {
    console.log(action)

    return reducer(state, action)
  }
}

function useReducerWithMiddleware(
  middleware,
  reducer,
  initialState
) {
  return useReducer(middleware(reducer), initialState)
}

function CheckoutBilling({ onSubmit }) {
  let [state, dispatch] = useReducerWithMiddleware(
    logMiddleware,
    (state, action) => {
      switch (action.type) {
        case 'TOGGLE_SAME_BILLING':
          return {
            ...state,
            sameAsBilling: !state.sameAsBilling,
          }
        case 'CHANGE_FIELD':
          return {
            ...state,
            [action.name]: action.value,
          }

        default:
          throw new Error('Unknown action: ' + action.type)
      }
    },
    {
      sameAsBilling: false,
      billingName: '',
      billingAddress: '',
      shippingName: '',
      shippingAddress: '',
    }
  )

  let {
    sameAsBilling,
    billingName,
    billingAddress,
    shippingName,
    shippingAddress,
  } = state

  function handleSubmit(event) {
    event.preventDefault()
    const fields = {
      billingName,
      billingAddress,
      shippingName: sameAsBilling
        ? billingName
        : shippingName,
      shippingAddress: sameAsBilling
        ? billingAddress
        : shippingAddress,
    }
    onSubmit(sameAsBilling, fields)
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Billing &amp; Shipping
      </Heading>
      <form onSubmit={handleSubmit} className="spacing">
        <Heading as="h2" size={3}>
          Billing Info
        </Heading>
        <hr />
        <div className="form-field">
          <label htmlFor="billing:name">Name</label>
          <input
            id="billing:name"
            type="text"
            required
            defaultValue={billingName}
            onChange={event =>
              dispatch({
                type: 'CHANGE_FIELD',
                name: 'billingName',
                value: event.target.value,
              })
            }
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input
            id="billing:address"
            type="text"
            required
            defaultValue={billingAddress}
            onChange={event =>
              dispatch({
                type: 'CHANGE_FIELD',
                name: 'billingAddress',
                value: event.target.value,
              })
            }
          />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label>
          <input
            type="checkbox"
            defaultChecked={sameAsBilling}
            onChange={() =>
              dispatch({ type: 'TOGGLE_SAME_BILLING' })
            }
          />{' '}
          Same as Billing
        </label>

        <div className="form-field">
          <label htmlFor="shipping:name">Name</label>
          <input
            id="shipping:name"
            type="text"
            required
            value={
              sameAsBilling ? billingName : shippingName
            }
            onChange={event =>
              dispatch({
                type: 'CHANGE_FIELD',
                name: 'shippingName',
                value: event.target.value,
              })
            }
            disabled={sameAsBilling}
          />
        </div>
        <div className="form-field">
          <label htmlFor="shipping:address">Address</label>
          <input
            id="shipping:address"
            type="text"
            required
            value={
              sameAsBilling
                ? billingAddress
                : shippingAddress
            }
            onChange={event =>
              dispatch({
                type: 'CHANGE_FIELD',
                name: 'shippingAddress',
                value: event.target.value,
              })
            }
            disabled={sameAsBilling}
          />
        </div>

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CheckoutBilling
