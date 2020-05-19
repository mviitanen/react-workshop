import React, { useState, useEffect } from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

function ProductsSidebar() {
  const query = '(min-width: 800px)'
  const [isWide, setIsWide] = useState(
    window.matchMedia(query).matches
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    function listener() {
      console.log('how many times is this called')
      setIsWide(media.matches)
    }
    media.addListener(listener)
    return () => {
      media.removeListener(listener)
    }
  }, [])

  return isWide ? (
    <aside>
      <ProductFilters />
    </aside>
  ) : null
}

export default ProductsSidebar
