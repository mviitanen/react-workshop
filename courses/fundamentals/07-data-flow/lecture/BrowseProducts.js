import React, { useState } from 'react'
import { useProducts } from './utils'
import { useShoppingCart } from './ShoppingCartState'
import BrowseProductItem from './BrowseProductItem'

function BrowseProducts({ cart, setCart }) {
  let products = useProducts()
  let { getCartSize } = useShoppingCart()

  return (
    <div className="spacing">
      <nav>
        <span>View Cart ({getCartSize()})</span>
      </nav>
      <hr />
      {Array.isArray(products) &&
        products.map(product => {
          return (
            <BrowseProductItem
              key={product.id}
              productId={product.id}
              name={product.name}
              price={product.price}
              imagePath={product.imagePath}
            />
          )
        })}
    </div>
  )
}

export default BrowseProducts
