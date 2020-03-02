import React, { useState } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import serializeForm from 'form-serialize'
import Heading from 'YesterTech/Heading'

function CheckoutBilling({ onSubmit }) {
  const [sameAsBilling, setSameAsBilling] = useState(false)
  const [billingName, setBillingName] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [shippingName, setShippingName] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const fields = {
      billingName,
      billingAddress,
      shippingName: sameAsBilling ? billingName : shippingName,
      shippingAddress: sameAsBilling
        ? billingAddress
        : shippingAddress
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
            name="billingName"
            autoComplete="off"
            defaultValue={billingName}
            onChange={e => {
              setBillingName(e.target.value)
            }}
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
            onChange={e => {
              setBillingAddress(e.target.value)
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
              let val = !sameAsBilling
              setSameAsBilling(val)
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
            disabled={sameAsBilling}
            value={sameAsBilling ? billingName : shippingName}
            onChange={e => {
              setShippingName(e.target.value)
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
            disabled={sameAsBilling}
            value={sameAsBilling ? billingAddress : shippingAddress}
            onChange={e => {
              setShippingAddress(e.target.value)
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
