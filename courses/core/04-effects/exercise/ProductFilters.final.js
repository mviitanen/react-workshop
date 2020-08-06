import React, { useState, useEffect } from 'react'
import ProductFilterList from 'YesterTech/ProductFilterList'
import { getCategories } from './utils'

function ProductFilters() {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    const doEffect = async () => {
      let isCurrent = true

      const categories = await getCategories()
      if (!isCurrent) return
      setCategories(categories)

      return () => (isCurrent = false)
    }
    doEffect()
  }, [])

  if (!categories) return null

  return (
    <div className="spacing">
      <ProductFilterList
        list={categories}
        urlKey="categories"
        label="Categories"
      />
    </div>
  )
}

export default ProductFilters
