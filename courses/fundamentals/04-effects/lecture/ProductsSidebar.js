import React, { useState, useEffect } from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

// Example: https://codesandbox.io/s/trusting-wind-9uwnv

function ProductsSidebar() {
  const [isWide, setIsWide] = useState(false)

  console.log('Is wide?', isWide)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 800px)')

    const listener = () => {
      setIsWide(media.matches) // true if >= 800px
    }

    media.addListener(listener)

    return () => {
      media.removeListener(listener)
    }
  }, [
    // dependency array
  ])

  return (
    isWide && (
      <aside>
        <ProductFilters />
      </aside>
    )
  )
}

export default ProductsSidebar
