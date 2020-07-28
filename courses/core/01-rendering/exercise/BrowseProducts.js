import React from 'react'
// import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
// import Heading from 'YesterTech/Heading'

const products = [
  {
    id: 3,
    name: 'Nintendo NES',
    rating: 4,
    brand: 'Nintendo',
    condition: 'fair'
  }
]

export default function BrowseProducts() {
  return (
    <div>
      {products.map(product => {
        return (
          <div key={random()}>
            <h1>{product.name}</h1>
            <div>Rating: {product.rating}</div>
            <div>Brand: {product.brand}</div>
          </div>
        )
      })}
    </div>
  )
}
