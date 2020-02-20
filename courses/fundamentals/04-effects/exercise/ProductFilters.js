import React, { useState, useEffect } from 'react'
import ProductFilterList from 'YesterTech/ProductFilterList'
import { getCategories } from './utils'

// Example: https://codesandbox.io/s/optimistic-jackson-g4hgj

function ProductFilters() {
  // useState
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    let canceled = false

    getCategories().then(categories => {
      if (canceled) return
      setCategories(categories)
    })

    return () => {
      canceled = true
    }
  }, [])

  if (!categories) return <div>Loading Filters...</div>

  return (
    <div className="spacing">
      <ProductFilterList list={categories} urlKey="categories" label="Categories" />
    </div>
  )
}

export default ProductFilters
