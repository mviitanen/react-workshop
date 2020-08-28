import React, { useState } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import serializeForm from 'form-serialize'
import Heading from 'YesterTech/Heading'

function CheckoutBilling({ onSubmit }) {
  const [sameAsBilling, setSameAsBilling] = useState(false)

  const [billingName, setBillingName] = useState()
  const [billingAddress, setBillingAddress] = useState()
  const [shippingName, setShippingName] = useState()
  const [shippingAddress, setShippingAddress] = useState()

  function handleSubmit(event) {
    event.preventDefault()
    // When the fields are stored in state above, this fields variable can just be
    // an object filled with the field states. We don't need `serializeForm` anymore
    const fields = serializeForm(event.target, { hash: true })
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
            onChange={event => {
              setBillingName(event.target.value)
            }}
            autoComplete="off"
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input
            id="billing:address"
            onChange={event => {
              setBillingAddress(event.target.value)
            }}
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
            id="shipping:name"
            type="text"
            required
            disabled={sameAsBilling}
            value={sameAsBilling ? billingName : shippingName}
            onChange={event => {
              setShippingName(event.target.value)
            }}
            name="shippingName"
            autoComplete="off"
          />
        </div>
        <div className="form-field">
          <label htmlFor="shipping:address">Address</label>
          <input
            id="shipping:address"
            type="text"
            disabled={sameAsBilling}
            value={sameAsBilling ? billingAddress : shippingAddress}
            onChange={event => {
              setShippingAddress(event.target.value)
            }}
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
