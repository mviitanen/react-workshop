import React, { useContext, useState, useEffect, useRef } from 'react'
import * as storage from 'YesterTech/localStorage'

const FavoriteProductContext = React.createContext()

export function FavoriteProductProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    return storage.getFavorites()
  })

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

  useEffect(() => {
    storage.updateFavorites(favorites)
  }, [favorites])

  return (
    <FavoriteProductContext.Provider value={context}>
      {children}
    </FavoriteProductContext.Provider>
  )
}

export function useFavoriteProduct() {
  return useContext(FavoriteProductContext)
}
