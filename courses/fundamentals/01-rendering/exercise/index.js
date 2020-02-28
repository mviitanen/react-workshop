import React from 'react'
import ReactDOM from 'react-dom'
import {
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
} from 'react-icons/fa'
import Heading from 'YesterTech/Heading'
import 'YesterTech/StarRatings.scss'
import 'YesterTech/styles/center-lesson.scss'

const products = [
  {
    id: 1,
    name: 'Mario Kart',
    rating: 5,
    brand: 'Nintendo',
    condition: 'new',
  },
  {
    id: 2,
    name: 'Donkey Kong',
    rating: 3.5,
    brand: 'Nintendo',
    condition: 'good',
  },
  {
    id: 3,
    name: 'Nintendo NES',
    rating: 4,
    brand: 'Nintendo',
    condition: 'fair',
  },
]

// 1. Composable
// 2. Declarative

function StarRating({ rating }) {
  let stars = []
  for (let i = 0; i < 5; i++) {
    if (i + 1 <= rating) {
      stars.push(<FaStar />)
    } else if (i < rating) {
      stars.push(<FaStarHalfAlt />)
    } else {
      stars.push(<FaRegStar />)
    }
  }

  return <span className="star-ratings">{stars}</span>
}

let el = <StarRating title="james" />

function BrowseProducts() {
  return (
    <div>
      {products.map(product => {
        return (
          <div key={product.id}>
            <Heading>{product.name}</Heading>
            <StarRating rating={product.rating} />
            <div className="text-small">
              <div>Brand: {product.brand}</div>
              <div>Condition: {product.condition}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

ReactDOM.render(
  <BrowseProducts />,
  document.getElementById('root')
)
