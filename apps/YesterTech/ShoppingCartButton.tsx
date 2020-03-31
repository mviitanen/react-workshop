import React from 'react'
import { Link } from 'react-router-dom'
import { MdShoppingCart } from 'react-icons/md'

const ShoppingCartButton: React.FC<ShoppingCartButtonProps> = ({ quantity, onClick }) => {
  return quantity > 0 ? (
    <Link to="/checkout" className="button cta-button">
      <MdShoppingCart />
      <span>Checkout</span>
    </Link>
  ) : (
    <button className="button" onClick={onClick}>
      Add To Cart
    </button>
  )
}

export default ShoppingCartButton

type ShoppingCartButtonProps = {
  quantity: number
  onClick?: React.ComponentProps<'button'>['onClick']
}
