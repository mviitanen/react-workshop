import React from 'react'
import classnames from 'classnames'
import 'YesterTech/Avatar.scss'

const Avatar: React.FC<AvatarProps> = ({ src, size = 3, className, ...rest }) => {
  const Component = src ? 'img' : 'div'
  return (
    <Component
      src={src || undefined}
      alt="Avatar"
      style={{ fontSize: `${size}rem` }}
      className={classnames('avatar', className)}
      {...rest}
    />
  )
}

export default Avatar

type AvatarProps = React.ComponentPropsWithoutRef<'div'> & {
  size?: number
  src?: string | undefined | null
}
