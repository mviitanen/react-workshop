import React from 'react'
import classnames from 'classnames'

import 'YesterTech/ProductImage.scss'

const ProductImage: React.FC<ProductImageProps> = ({ size = 7, className, ...rest }) => {
  return (
    <img
      className={classnames('product-image', className)}
      style={{ fontSize: `${size}rem` }}
      alt={rest.alt || ''}
      {...rest}
    />
  )
}

export default ProductImage

type ProductImageProps = React.ComponentPropsWithoutRef<'img'> & {
  size?: number
}
