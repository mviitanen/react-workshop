import React, { useContext, useState, useEffect, useRef } from 'react'
import * as storage from 'YesterTech/localStorage'

const FavoriteContext = React.createContext()

export function FavoriteProductProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    return window && storage.getFavorites()
  })

  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (!firstRenderRef.current) {
      storage.updateFavorites(favorites)
    }
    firstRenderRef.current = false
  }, [favorites])

  const context = {
    isFavorite: function(productId) {
      return favorites.includes(productId)
    },
    addFavorite: function(productId) {
      setFavorites(favorites.concat([productId]))
    },
    removeFavorite: function(productId) {
      setFavorites(favorites.filter(id => id !== productId))
    }
  }

  return <FavoriteContext.Provider value={context} children={children} />
}

export function useFavoriteProduct() {
  return useContext(FavoriteContext)
}
