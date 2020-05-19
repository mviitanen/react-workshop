import React from 'react'
import ReactDOM from 'react-dom'
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
    id: 2,
    name: 'Donkey Kong',
    rating: 3.5,
    brand: 'Nintendo',
    condition: 'good'
  },
  {
    id: 3,
    name: 'Nintendo NES',
    rating: 4,
    brand: 'Nintendo',
    condition: 'fair'
  }
]

function BrowseProducts() {
  return (
    <div>
      {products.map((product, index) => {
        return (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <div>
              Rating: <StarRatings rating={product.rating} />
            </div>
            <div>condition: {product.condition}</div>
          </div>
        )
      })}
      <button>Remove Donkey Kong</button>
    </div>
  )
}

ReactDOM.render(<BrowseProducts />, document.getElementById('root'))
