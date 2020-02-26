import React, { useState, useEffect, createContext, useContext } from 'react'
import { render, cleanup, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

function getProduct(id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({
        id,
        from: 'the product store',
      })
    }, 1000)
  })
}

function getProductQuickly(id) {
  return Promise.resolve({
    id,
    from: 'the product store',
  })
}

function getRelatedProducts(id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([])
    }, 1000)
  })
}

const ApiContext = createContext()

function Product() {
  const api = useContext(ApiContext)
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState(null)

  useEffect(() => {
    api.getProduct(42).then(result => {
      setProduct(result)
    })

    api.getRelatedProducts(42).then(result => {
      setRelatedProducts(result)
    })
  }, [])

  if (!product) {
    return <div data-testid="loading-product">Loading...</div>
  }

  return (
    <section>
      {product ? (
        <div data-testid="product">
          <h1>Got a product</h1>
          <strong>id: {product.id}</strong>
          {/* Show related products */}
        </div>
      ) : (
        <div data-testid="loading-product">Loading product...</div>
      )}
      {relatedProducts ? (
        <ul data-testid="related-products">
          {relatedProducts.map(p => (
            <li>{p.id}</li>
          ))}
        </ul>
      ) : (
        <div data-testid="loading-related-products">Loading related products...</div>
      )}
    </section>
  )
}

describe('some product', () => {
  it('should load with the product', async () => {
    const { getByTestId, queryByTestId } = render(
      <ApiContext.Provider
        value={{
          getProduct: getProductQuickly,
          getRelatedProducts,
        }}
      >
        <Product />
      </ApiContext.Provider>
    )

    expect(getByTestId('loading-product')).not.toBeNull()

    // fix the act() warning: https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
    await Promise.all([
      wait(() => {
        const el = queryByTestId('product')

        expect(el).not.toBeNull()
      }),

      wait(() => {
        const el = queryByTestId('related-products')

        expect(el).not.toBeNull()
      }),
    ])
  })
})
