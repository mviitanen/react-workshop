import { UserNoId, CartProduct } from 'YesterTech/types'
/**
 * Auth
 */

const LOCAL_STORAGE_KEY_AUTH = 'reacttraining-workshop-auth'
const LOCAL_STORAGE_KEY_CART = 'reacttraining-workshop-cart'

export function login(user: UserNoId) {
  localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, JSON.stringify(user))
}

export function logout() {
  localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH)
}

export function getAuthenticatedUser() {
  try {
    const localStorageUser = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH)
    if (!localStorageUser) return
    return JSON.parse(localStorageUser)
  } catch (e) {
    return
  }
}

/**
 * Cart
 */

export function updateCart(cart: CartProduct[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(cart))
}

export function getCart() {
  try {
    const cart = localStorage.getItem(LOCAL_STORAGE_KEY_CART)
    if (!cart) return null
    return JSON.parse(cart) as CartProduct[]
  } catch (e) {
    return null
  }
}
