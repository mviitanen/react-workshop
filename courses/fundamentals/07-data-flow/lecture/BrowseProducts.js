import React, { useState } from 'react'
import { useProducts } from './utils'
import { useShoppingCart } from './ShoppingCartState'
import BrowseProductItem from './BrowseProductItem'

function BrowseProducts() {
  const products = useProducts()
  const { cart, getCartSize } = useShoppingCart()

  return (
    <div className="spacing">
      <nav>
        {cart.length > 0 && <span>View Cart ({getCartSize()})</span>}
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
