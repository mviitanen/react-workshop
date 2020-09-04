import React, { useState, useEffect, useRef } from 'react'
import './styles.scss'

export default function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState(null)
  const [save, setSave] = useState(false)

  const countRef = useRef()
  countRef.current = 7

  useEffect(() => {
    if (save) {
      setTimeout(() => {
        setMessage(
          `We saved a count of ${count}, but the current count is ${countRef.current}`
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
