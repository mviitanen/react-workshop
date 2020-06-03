import React, { useState, useEffect } from 'react'
import ProductFilterList from 'YesterTech/ProductFilterList'
import { getCategories } from './utils'

function ProductFilters() {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    console.log('when does the effect run')
    let isCurrent = true
    getCategories().then(categories => {
      console.log('when does the promise resolve')
      if (isCurrent) {
        setCategories(categories)
      }
    })
    // When we unmount
    return () => {
      console.log('when does the cleanup get called')
      isCurrent = false
    }
  }, [])

  if (!categories) return <div>Loading Filters...</div>

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
