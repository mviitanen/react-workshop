import React from 'react'
// import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import Heading from 'YesterTech/Heading'
import StarRatings from './StarRatings'

const products = [
  {
    id: 1,
    name: 'Mario Kart',
    rating: 5,
    brand: 'Nintendo',
    condition: 'new'
  },

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
      {products.map(product => (
        <div key={product.id}>
          <Heading>{product.name}</Heading>
          <div>brand: {product.brand}</div>
          <div>
            <StarRatings rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  )
}
