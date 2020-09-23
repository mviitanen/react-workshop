import React, { useState, useEffect } from 'react'
import ProductFilterList from 'YesterTech/ProductFilterList'
import { getCategories } from './utils'

const ProductFilters = function() {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    let isCurrent = true
    getCategories().then(x => {
      if (!isCurrent) return
      setCategories(x)
    })
    return () => (isCurrent = false)
  }, [])

  if (!categories) return <div>Loading Filters...</div>

  return (
    <div className="spacing">
      <ProductFilterList list={categories} urlKey="categories" label="Categories" />
    </div>
  )
}

export default ProductFilters
