import React, { useState } from 'react'
import Quantity from './Quantity'
// import { useShoppingCart } from './ShoppingCartState'
import ProductImage from 'YesterTech/ProductImage'

function BrowseProductItem({ productId, name, price, imagePath }) {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        {quantity > 0 && <button className="button">Add To Cart</button>}
        <div className="align-right">
          <Quantity
            quantity={quantity}
            onChange={quantity => {
              setQuantity(quantity)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default BrowseProductItem
