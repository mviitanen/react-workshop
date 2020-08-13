import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState(null)
  const [save, setSave] = useState(false)

  useEffect(() => {
    if (save) {
      setTimeout(() => {
        setMessage(`We saved a count of ${count}`)
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

ReactDOM.render(<App />, document.getElementById('root'))
