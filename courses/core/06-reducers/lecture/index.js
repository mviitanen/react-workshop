import React, { useRef, useReducer } from 'react'
import ReactDOM from 'react-dom'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function useState(defaultState) {
  return useReducer((_, action) => action, defaultState)
}

function App() {
  const nameRef = useRef()
  const [name, setName] = useState('brad')

  console.log(name)

  function handleSubmit(e) {
    e.preventDefault()
    setName(nameRef.current.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="name" ref={nameRef} />
      <br />
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
