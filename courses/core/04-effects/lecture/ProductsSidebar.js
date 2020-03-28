import React, { useState, useEffect } from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

function ProductsSidebar() {
  const [wide, setWide] = useState(
    window.matchMedia('(min-width: 800px)').matches
  )

  useEffect(() => {
    const media = window.matchMedia('(min-width: 800px)')
    const listener = () => {
      console.log('here')
      setWide(media.matches)
    }
    media.addListener(listener)
    return () => {
      media.removeListener(listener)
    }
  }, [])

  return wide ? (
    <aside>
      <ProductFilters />
    </aside>
  ) : null
}

export default ProductsSidebar
