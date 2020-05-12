import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'
import 'YesterTech/styles/center-lesson.scss'

function useApi(api) {
  const [response, setResponse] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api().then(response => {
      if (!isCurrent) return
      setResponse(response)
    })
    return () => (isCurrent = false)
  }, [])

  return response
}

function ProductProfile({ productId }) {
  const product = useApi(() => api.products.getProduct(productId))

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
