import React, { useState, useEffect } from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

function useMedia(query) {
  const [matches, setMatches] = useState(
    window.matchMedia(query).matches
  )

  useEffect(() => {
    console.log('how many times does this get called')
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

function ProductsSidebar() {
  const isWide = useMedia('(min-width: 800px)')

  return isWide ? (
    <aside>
      <ProductFilters />
    </aside>
  ) : null
}

export default ProductsSidebar
