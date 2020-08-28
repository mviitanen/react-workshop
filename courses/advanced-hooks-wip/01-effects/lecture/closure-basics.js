import React, { useState, useEffect, useRef } from 'react'
import './styles.scss'

export default function App() {
  const [count, setCount] = useState(0)
  const [save, setSave] = useState(false)
  const [message, setMessage] = useState(null)

  // Mutable Refs
  const countRef = useRef()
  countRef.current = count

  useEffect(() => {
    if (save) {
      setTimeout(() => {
        setMessage(
          `We saved a count of ${count}, the recent count is ${countRef.current}`
        )
      }, 3000)
    }
  }, [save])

  function saveToDatabase() {
    setSave(true)
  }

  return (
    <div className="align-center spacing closure-basics">
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <hr />
      <button className="button" onClick={saveToDatabase}>
        Save Count to Database
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}
