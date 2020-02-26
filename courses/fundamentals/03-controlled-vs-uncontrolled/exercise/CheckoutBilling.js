import React, { useState, useRef } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import Heading from 'YesterTech/Heading'

function CheckoutBilling({ onSubmit }) {
  const [sameAsBilling, setSameAsBilling] = useState(false)
  const [billingName, setBillingName] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [shippingName, setShippingName] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')

  const billingNameRef = useRef()

  function handleSubmit(event) {
    event.preventDefault()

    console.log(billingNameRef.current.value)

    const fields = { billingName, billingAddress, shippingName, shippingAddress }
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
            onChange={event => {
              setBillingName(event.target.value)
            }}
            id="billing:name"
            type="text"
            required
            ref={billingNameRef}
            name="billingName"
            autoComplete="off"
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input
            onChange={event => {
              setBillingAddress(event.target.value)
            }}
            id="billing:address"
            type="text"
            required
            name="billingAddress"
          />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label>
          <input
            type="checkbox"
            defaultChecked={sameAsBilling}
            onChange={() => setSameAsBilling(!sameAsBilling)}
          />{' '}
          Same as Billing
        </label>

        <div className="form-field">
          <label htmlFor="shipping:name">Name</label>
          <input
            onChange={event => {
              setShippingName(event.target.value)
            }}
            value={sameAsBilling ? billingName : shippingName}
            disabled={sameAsBilling}
            id="shipping:name"
            type="text"
            required
            name="shippingName"
            autoComplete="off"
          />
        </div>
        <div className="form-field">
          <label htmlFor="shipping:address">Address</label>
          <input
            onChange={event => {
              setShippingAddress(event.target.value)
            }}
            value={sameAsBilling ? billingAddress : shippingAddress}
            disabled={sameAsBilling}
            id="shipping:address"
            type="text"
            required
            name="shippingAddress"
            autoComplete="off"
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
