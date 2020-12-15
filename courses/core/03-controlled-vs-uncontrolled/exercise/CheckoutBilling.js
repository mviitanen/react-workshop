import React, { useState, useRef } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import serializeForm from 'form-serialize'
import Heading from 'YesterTech/Heading'

function CheckoutBilling({ onSubmit }) {
  const [sameAsBilling, setSameAsBilling] = useState(false)

  const billingNameRef = useRef()

  function handleSubmit(event) {
    event.preventDefault()
    const fields = {
      billingName: billingNameRef.current.value,
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
            ref={billingNameRef}
            type="text"
            required
            value={billingName}
            onChange={(event) => setBillingName(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input
            id="billing:address"
            type="text"
            required
            defaultValue={billingAddress}
            onChange={(event) => setBillingAddress(event.target.value)}
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
            id="shipping:name"
            type="text"
            required
            name="shippingName"
            autoComplete="off"
            value={sameAsBilling ? billingName : shippingName}
            disabled={sameAsBilling}
            onChange={(event) => {
              setShippingName(event.target.value)
            }}
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
            disabled={sameAsBilling}
            onChange={(event) => {
              setShippingAddress(event.target.value)
            }}
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
