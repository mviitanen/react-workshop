import React, { useCallback, useContext, useReducer, useRef, useEffect } from 'react'
import { CartProduct } from 'YesterTech/types'
import * as storage from 'YesterTech/localStorage'

const ShoppingCartContext = React.createContext({} as ShoppingCartContextValue)

enum ShoppingCartActionTypes {
  Add = 'ADD',
  Update = 'UPDATE',
  Remove = 'REMOVE',
}

export const ShoppingCartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: ShoppingCartState, action: ShoppingCartActions): ShoppingCartState => {
      switch (action.type) {
        case ShoppingCartActionTypes.Add: {
          const found = state.cart.find((p) => p.productId === getInt(action.productId))
          if (!found) {
            return {
              ...state,
              cart: state.cart.concat({
                productId: getInt(action.productId),
                quantity: 1,
                name: action.name || '',
                price: action.price || 0,
              }),
            }
          } else {
            return state
          }
        }
        case ShoppingCartActionTypes.Update: {
          let cart
          if (action.quantity > 0) {
            cart = state.cart.map((product) => {
              return product.productId === getInt(action.productId)
                ? { ...product, quantity: getInt(action.quantity) }
                : product
            })
          } else {
            cart = state.cart.filter((product) => product.productId !== getInt(action.productId))
          }
          return { ...state, cart }
        }
        case ShoppingCartActionTypes.Remove: {
          const c = state.cart
          const index = c.findIndex((p) => p.productId === action.productId)
          const updatedCart = [...c.slice(0, index), ...c.slice(index + 1)]
          return { ...state, cart: updatedCart }
        }
        default:
          return state
      }
    },
    {
      cart: storage.getCart() || [],
    }
  )

  const stateRef = useRef(state)
  stateRef.current = state

  const value: ShoppingCartContextValue = {
    ...state,
    addToCart(productId, name, price) {
      dispatch({ type: ShoppingCartActionTypes.Add, productId, name, price })
    },
    updateQuantity: useCallback((productId, quantity) => {
      dispatch({ type: ShoppingCartActionTypes.Update, productId, quantity })
    }, []),
    removeFromCart: useCallback((productId) => {
      dispatch({ type: ShoppingCartActionTypes.Remove, productId })
    }, []),
    getQuantity: useCallback((productId) => {
      if (!Array.isArray(stateRef.current.cart)) return 0
      return (stateRef.current.cart.filter((p) => p.productId === productId)[0] || {}).quantity || 0
    }, []),
    getCartSize: useCallback(() => {
      if (!Array.isArray(stateRef.current.cart)) return 0
      return stateRef.current.cart.reduce((size, item) => size + item.quantity, 0)
    }, []),
    getCartTotal: useCallback(() => {
      if (!Array.isArray(stateRef.current.cart)) return 0
      return stateRef.current.cart.reduce((total, item) => total + item.quantity * item.price, 0)
    }, []),
  }

  return <ShoppingCartContext.Provider value={value} children={children} />
}

export function useShoppingCart() {
  const cartState = useContext(ShoppingCartContext)

  useEffect(() => {
    storage.updateCart(cartState.cart)
  }, [cartState.cart])

  return cartState
}

function getInt(val: string | number, radix: number = 10) {
  return typeof val === 'number' ? val : parseInt(val, radix)
}

// Types

type ShoppingCartActions =
  | {
      type: ShoppingCartActionTypes.Add
      productId: CartProduct['productId']
      name: CartProduct['name']
      price: CartProduct['price']
    }
  | {
      type: ShoppingCartActionTypes.Update
      quantity: CartProduct['quantity']
      productId: CartProduct['productId']
    }
  | { type: ShoppingCartActionTypes.Remove; productId: CartProduct['productId'] }

type ShoppingCartState = {
  cart: CartProduct[]
}

type ShoppingCartContextValue = {
  addToCart(
    productId: CartProduct['productId'],
    name: CartProduct['name'],
    price: CartProduct['price']
  ): void
  updateQuantity: (productId: CartProduct['productId'], quantity: CartProduct['quantity']) => void
  removeFromCart: (productId: CartProduct['productId']) => void
  getQuantity: (productId: CartProduct['productId']) => number
  getCartSize: () => number
  getCartTotal: () => number
  cart: CartProduct[]
}
