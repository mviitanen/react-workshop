import React, { useState, useEffect } from 'react'
import ProductFilterList from 'YesterTech/ProductFilterList'
import { getCategories } from './utils'

function useCategories() {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    let isCurrent = true
    getCategories().then(categories => {
      if (!isCurrent) return
      setCategories(categories)
    })
    return () => {
      isCurrent = false
    }
  }, [])

  return { categories, setCategories }
}

function ProductFilters() {
  const { categories } = useCategories()

  if (!categories) return <div>Loading Filters...</div>

  return (
    <div className="spacing">
      <ProductFilterList list={categories} urlKey="categories" label="Categories" />
    </div>
  )
}

export default ProductFilters
