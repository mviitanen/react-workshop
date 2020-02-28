import React, { useState } from 'react'
import Quantity from './Quantity'
import { useShoppingCart } from './ShoppingCartState'
import ProductImage from 'YesterTech/ProductImage'

function BrowseProductItem({
  productId,
  name,
  price,
  imagePath,
}) {
  let {
    addToCart,
    getQuantity,
    updateQuantity,
  } = useShoppingCart()
  let quantity = getQuantity(productId)

  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        {quantity > 0 ? (
          <button
            className="button"
            onClick={() => {
              /* checkout */
            }}
          >
            Checkout
          </button>
        ) : (
          <button
            className="button"
            onClick={() =>
              addToCart(productId, name, price)
            }
          >
            Add To Cart
          </button>
        )}
        {quantity > 0 && (
          <div className="align-right">
            <Quantity
              quantity={quantity}
              onChange={quantity =>
                updateQuantity(productId, quantity)
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowseProductItem
