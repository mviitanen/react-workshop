import React, { useMemo } from 'react'
import Heading from 'YesterTech/Heading'
import { useTheme } from './ThemeState'
import Tweet from './Tweet'

function Reviews() {
  const { dark } = useTheme()

  const options = useMemo(
    () => ({
      theme: dark ? 'dark' : 'light'
    }),
    [dark]
  )

  return (
    <div className="spacing">
      <Heading>Reviews</Heading>
      <Tweet id="1274126046648864768" options={options} />
      <Tweet id="1294327194009952256" options={options} />
    </div>
  )
}

export default Reviews
