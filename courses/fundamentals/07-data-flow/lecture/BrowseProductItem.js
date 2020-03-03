import React, { useState } from 'react'
import Quantity from './Quantity'
import { useShoppingCart } from './ShoppingCartState'
import ProductImage from 'YesterTech/ProductImage'

function BrowseProductItem({ productId, name, price, imagePath }) {
  // const [quantity, setQuantity] = useState(0)
  let { addToCart, getQuantity, updateQuantity } = useShoppingCart()
  const quantity = getQuantity(productId)

  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        <button
          className={'button' + (quantity > 0 ? ' cta-button' : '')}
          onClick={() =>
            quantity === 0 ? addToCart(productId, name, price) : null
          }
        >
          {quantity >= 1 ? 'Checkout' : 'Add To Cart'}
        </button>
        <div className="align-right">
          {quantity > 0 && (
            <Quantity
              quantity={quantity}
              onChange={q => {
                updateQuantity(productId, q)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default BrowseProductItem
