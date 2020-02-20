import React, { useState, useReducer } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import serializeForm from 'form-serialize'
import Heading from 'YesterTech/Heading'

const initialState = {
  sameAsBilling: false,
  billingName: '',
  billingAddress: '',
  shippingName: '',
  shippingAddress: '',
}

function checkoutReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_SAME_AS_BILLING':
      const sameAsBilling = !state.sameAsBilling

      if (sameAsBilling) {
        return {
          ...state,
          shippingName: state.billingName,
          shippingAddress: state.billingAddress,
          sameAsBilling,
        }
      } else {
        return {
          ...state,
          sameAsBilling: state.sameAsBilling,
        }
      }

    case 'CHANGE_FIELD':
      // {
      //  type: 'CHANGE_FIELD',
      //   field: 'shippingName',
      //   value: 'David'
      // }
      return {
        ...state,
        [action.field]: action.value,
      }
    default:
      return state
  }
}

function CheckoutBilling({ onSubmit }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState)
  const [billingName, setBillingName] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [_, setShippingName] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')

  const { sameAsBilling, shippingName } = state

  function handleSubmit(event) {
    event.preventDefault()
    // When the fields are stored in state above, this fields variable can just be
    // an object filled with the field states. We don't need `serializeForm` anymore
    // const fields = serializeForm(event.target, { hash: true })
    const fields = {
      billingName,
      billingAddress,
      shippingName: sameAsBilling ? billingName : shippingName,
      shippingAddress: sameAsBilling ? billingAddress : shippingAddress,
    }
    console.log(fields)
    onSubmit(sameAsBilling, fields)
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Billing & Shipping
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
            name="billingName"
            autoComplete="off"
            onChange={event => {
              dispatch({
                type: 'CHANGE_FIELD',
                field: 'billingName',
                value: event.target.value,
              })
            }}
            defaultValue={state.billingName}
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input
            id="billing:address"
            type="text"
            required
            name="billingAddress"
            defaultValue={billingAddress}
            onChange={event => {
              setBillingAddress(event.target.value)
            }}
          />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label>
          <input
            type="checkbox"
            defaultChecked={sameAsBilling}
            onChange={() => {
              dispatch({
                type: 'TOGGLE_SAME_AS_BILLING',
              })
            }}
          />{' '}
          Same as Billing
        </label>

        <div className="form-field">
          <label htmlFor="shipping:name">Name</label>
          <input
            id="shipping:name"
            type="text"
            required
            name="shippingName"
            autoComplete="off"
            value={sameAsBilling ? billingName : shippingName}
            onChange={event => {
              setShippingName(event.target.value)
            }}
            disabled={sameAsBilling}
          />
        </div>
        <div className="form-field">
          <label htmlFor="shipping:address">Address</label>
          <input
            id="shipping:address"
            type="text"
            required
            name="shippingAddress"
            autoComplete="off"
            value={sameAsBilling ? billingAddress : shippingAddress}
            onChange={event => {
              setShippingAddress(event.target.value)
            }}
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
