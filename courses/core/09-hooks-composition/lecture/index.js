import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'
import 'YesterTech/styles/center-lesson.scss'

function usePromise(pro) {
  const [results, setResults] = useState(null)

  useEffect(() => {
    let isCurrent = true
    pro().then(results => {
      if (!isCurrent) return
      setResults(results)
    })
    return () => (isCurrent = false)
  }, [pro])

  return results
}

function ProductProfile({ productId }) {
  const product = usePromise(
    useCallback(() => api.products.getProduct(productId), [productId])
  )

  if (!product) return <div>Loading...</div>

  return (
    <div>
      <Heading>{product.name}</Heading>
      <StarRatings rating={product.rating} />
    </div>
  )
}

ReactDOM.render(
  <ProductProfile productId={1} />,
  document.getElementById('root')
)
