import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { MdShoppingCart } from 'react-icons/md'
import Heading from 'YesterTech/Heading'

const CheckoutBilling: React.FC<CheckoutBillingProps> = ({
  onSubmit,
  defaultSameAsBilling = false,
  defaultFields = {} as Fields,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    sameAsBilling: defaultSameAsBilling,
    billingName: defaultFields.billingName || '',
    billingAddress: defaultFields.billingAddress || '',
    shippingName: defaultFields.shippingName || '',
    shippingAddress: defaultFields.shippingAddress || '',
  })

  const {
    sameAsBilling,
    billingName,
    billingAddress,
    shippingName,
    shippingAddress,
  } = state

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = {
      billingName,
      billingAddress,
      shippingName: sameAsBilling ? billingName : shippingName,
      shippingAddress: sameAsBilling
        ? billingAddress
        : shippingAddress,
    }
    onSubmit(sameAsBilling, fields)
  }

  function changeField(field: keyof Fields, value: string) {
    dispatch({ type: 'CHANGE_FIELD', field, value })
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
            onChange={(event) =>
              changeField('billingName', event.target.value)
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
            onChange={(event) =>
              changeField('billingAddress', event.target.value)
            }
          />
        </div>

        <Columns split gutters middle>
          <Column className="spacing">
            <Heading as="h2" size={3}>
              Shipping Info
            </Heading>
          </Column>
          <Column>
            <label>
              <input
                type="checkbox"
                defaultChecked={sameAsBilling}
                onChange={() =>
                  dispatch({ type: 'TOGGLE_SAME_AS_BILLING' })
                }
              />{' '}
              Same as Billing
            </label>
          </Column>
        </Columns>

        <hr />

        <div className="form-field">
          <label htmlFor="shipping:name">Name</label>
          <input
            id="shipping:name"
            type="text"
            required
            value={sameAsBilling ? billingName : shippingName}
            onChange={(event) =>
              changeField('shippingName', event.target.value)
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
            value={sameAsBilling ? billingAddress : shippingAddress}
            onChange={(event) =>
              changeField('shippingAddress', event.target.value)
            }
            disabled={sameAsBilling}
          />
        </div>

        <hr />

        <Columns split>
          <Column>
            <Link className="button" to="/checkout/cart">
              <FaAngleLeft />
              <span>Cart</span>
            </Link>
          </Column>
          <Column>
            <button type="submit" className="button">
              <span>Review</span>
              <FaAngleRight />
            </button>
          </Column>
        </Columns>
      </form>
    </div>
  )
}

export default CheckoutBilling

function reducer(
  state: CheckoutBillingState,
  event: CheckoutBillingEvent
): CheckoutBillingState {
  switch (event.type) {
    case 'TOGGLE_SAME_AS_BILLING':
      return { ...state, sameAsBilling: !state.sameAsBilling }
    case 'CHANGE_FIELD':
      return { ...state, [event.field]: event.value }
    default:
      return state
  }
}

type CheckoutBillingProps = {
  onSubmit: (sameAsBilling: boolean, fields: Fields) => void
  defaultSameAsBilling?: boolean
  defaultFields?: Fields
}

type Fields = {
  billingName: string
  billingAddress: string
  shippingName: string
  shippingAddress: string
}

type CheckoutBillingState = Fields & {
  sameAsBilling: boolean
}

type CheckoutBillingEvent =
  | { type: 'TOGGLE_SAME_AS_BILLING' }
  | { type: 'CHANGE_FIELD'; field: keyof Fields; value: string }
