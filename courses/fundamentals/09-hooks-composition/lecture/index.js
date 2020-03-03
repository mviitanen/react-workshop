import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useReducer
} from 'react'
import ReactDOM from 'react-dom'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'
import 'YesterTech/styles/center-lesson.scss'

function usePromise(api) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOADING':
          return { ...state, loading: true }
        case 'RESOLVED':
          return {
            loading: false,
            response: action.response,
            error: null
          }
        case 'ERROR':
          return {
            loading: false,
            response: null,
            error: action.error
          }
      }
    },
    {
      loading: false,
      response: null,
      error: null
    }
  )

  useEffect(() => {
    let isCurrent = true
    dispatch({ type: 'LOADING' })
    api()
      .then(response => {
        if (!isCurrent) return
        dispatch({ type: 'RESOLVED', response })
      })
      .catch(error => {
        dispatch({ type: 'ERROR', error })
      })
    return () => (isCurrent = false)
  }, [api])

  return state
}

function ProductProfile({ productId }) {
  const state = usePromise(
    useCallback(() => api.products.getProducts(productId), [
      productId
    ])
  )

  if (state.loading) return <div>Loading...</div>
  if (state.error) return <div>Something went wrong</div>

  let products = state?.response?.products

  return (
    <div>
      {products?.map(product => (
        <div key={Math.random()}>
          <Heading>{product.name}</Heading>
          <StarRatings rating={product.rating} />
        </div>
      ))}
    </div>
  )
}

ReactDOM.render(
  <ProductProfile productId={1} />,
  document.getElementById('root')
)
