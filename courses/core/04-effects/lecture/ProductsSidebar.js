import React, { useState, useEffect } from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

function useMedia(query) {
  const [matches, setMatches] = useState(() => {
    return window && window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => {
      setMatches(media.matches)
    }
    media.addListener(listener)
    return () => {
      media.removeListener(listener)
    }
  }, [query])

  return matches
}

function ProductsSidebar({ size = 800 }) {
  const isWide = useMedia(`(min-width: ${size}px)`)

  return isWide ? (
    <aside>
      <ProductFilters />
    </aside>
  ) : null
}

export default ProductsSidebar
