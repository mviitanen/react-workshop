import React, { useState, useEffect } from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

function useMedia(query) {
  const [isWide, setIsWide] = useState(() => {
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => {
      setIsWide(media.matches)
    }
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return isWide
}

function ProductsSidebar({ width }) {
  const query = `(min-width: ${width}px)`

  const isWide = useMedia(query)

  return isWide ? (
    <aside>
      <ProductFilters />
    </aside>
  ) : null
}

export default ProductsSidebar
