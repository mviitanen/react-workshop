import React, { useState, useMemo } from 'react'
import { reallyLongRunningFunction } from './utils'

export default function App() {
  const [count, setCount] = useState(0)

  console.time()
  const x = useMemo(reallyLongRunningFunction, [])
  console.timeEnd()

  const options = useMemo(() => ({}), [])

  return (
    <div className="align-center">
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <Tweet options={options} />
      <p>Notice the delay when we click!</p>
    </div>
  )
}
