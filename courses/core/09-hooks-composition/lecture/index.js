import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'
import 'YesterTech/styles/center-lesson.scss'

function usePromise(p) {
  const [response, setResponse] = useState(null)
  useEffect(() => {
    let isCurrent = true
    p().then(response => {
      if (!isCurrent) return
      setResponse(response)
    })
    return () => (isCurrent = false)
  }, [p])

  return response
}

function ProductProfile({ productId }) {
  const getProduct = useCallback(
    () => api.products.getProduct(productId),
    [productId]
  )
  const product = usePromise(getProduct)

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
