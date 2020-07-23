import React from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import Heading from 'YesterTech/Heading'
import 'YesterTech/styles/global-styles.scss'
import 'YesterTech/StarRatings.scss'
import 'YesterTech/styles/center-lesson.scss'
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

function BrowseProductItem({ name, rating, brand }) {
  return (
    <div>
      <h1>{name}</h1>
      <div>
        Rating: <StarRatings rating={rating} />
      </div>
      <div>Brand: {brand}</div>
    </div>
  )
}

function BrowseProducts() {
  return (
    <div>
      {products.map(product => {
        return (
          <BrowseProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            brand={product.brand}
          />
        )
      })}
    </div>
  )
}

ReactDOM.render(<BrowseProducts />, document.getElementById('root'))
