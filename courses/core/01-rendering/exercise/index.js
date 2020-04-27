import React from 'react'
import ReactDOM from 'react-dom'
import StarRatings from './StarRatings'
import 'YesterTech/styles/global-styles.scss'
import 'YesterTech/StarRatings.scss'
import 'YesterTech/styles/center-lesson.scss'

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
  function handleClick() {
    console.log('click')
  }

  return (
    <div>
      <button onClick={handleClick} className="button">
        Click Me
      </button>

      {products.map(product => {
        return (
          <div key={`product-${product.id}`}>
            <h1>{product.name}</h1>
            <div>
              <StarRatings rating={product.rating} />
            </div>
            <div>Brand: {product.brand}</div>
          </div>
        )
      })}
    </div>
  )
}

ReactDOM.render(<BrowseProducts />, document.getElementById('root'))
