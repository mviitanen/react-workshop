import React, { useState, useEffect, useCallback, useMemo } from 'react'
import ReactDOM from 'react-dom'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'
import 'YesterTech/styles/center-lesson.scss'

// api is a function that returns a promise
function useApi(api) {
  const [response, setResponse] = useState(null)

  useEffect(() => {
    let canceled = false

    api().then(res => {
      if (canceled) return
      console.log('Not canceled, making API call!', Date.now())
      setResponse(res)
    })

    return () => {
      canceled = true
    }
  }, [api])

  return response
}

const User = ({ user }) => {
  console.log('Rerendered user', Date.now())
  return (
    <div>
      <div>Name: {user.name}</div>
      <div>Location: {user.location}</div>
    </div>
  )
}

function ProductProfile({ productId }) {
  const name = 'David'
  const location = 'Orlando'
  const user = useMemo(
    () => ({
      name,
      location,
    }),
    [name, location]
  )

  const getProduct = useCallback(() => api.products.getProduct(productId), [productId])
  const product = useApi(getProduct)

  return (
    <div>
      <User user={user} />
      {!product ? (
        <div>Loading...</div>
      ) : (
        <>
          <Heading>{product.name}</Heading>
          <StarRatings rating={product.rating} />
        </>
      )}
    </div>
  )
}

ReactDOM.render(<ProductProfile productId={1} />, document.getElementById('root'))
