import React, {
  useReducer,
  useState,
  useEffect,
  useCallback,
} from 'react'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'
import { Product } from 'YesterTech/types'

function useProduct(productId: number) {
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    let isCurrent = true
    api.products.getProduct(productId).then((product) => {
      if (!isCurrent) return
      setProduct(product)
    })
    return () => {
      isCurrent = false
    }
  }, [productId])

  return product
}

const ProductProfile: React.FC<ProductProfileProps> = ({
  productId,
}) => {
  const product = useProduct(productId)

  if (!product) return <div>Loading...</div>

  return (
    <div>
      <Heading>{product.name}</Heading>
      <StarRatings rating={product.rating} />
    </div>
  )
}

export default ProductProfile

// Types

type ProductProfileProps = {
  productId: number
}

type PromiseState<T> = {
  loading: boolean
  response: null | T
  error: null | Error
}

type PromiseAction<T> =
  | { type: 'LOADING' }
  | { type: 'RESOLVED'; response: T }
  | { type: 'ERROR'; error: Error }
