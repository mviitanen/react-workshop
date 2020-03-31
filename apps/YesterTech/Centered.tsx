import React from 'react'

const Centered: React.FC<CenteredProps> = ({
  as: Component = 'div',
  size = 30,
  children,
  ...rest
}) => {
  return (
    <Component
      style={{
        margin: `0 auto`,
        maxWidth: `${size}rem`,
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Centered

type CenteredProps = React.ComponentPropsWithoutRef<any> & {
  as?: any
  size?: number
}
