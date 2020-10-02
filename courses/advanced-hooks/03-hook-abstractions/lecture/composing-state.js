import React, { useRef, useEffect, useReducer } from 'react'

function useState(defaultState) {
  return useReducer((_, newState) => newState, defaultState)
}

function useUndoState(state) {
  const [value, setValue] = state
  const historyRef = useRef([])

  function undo() {
    return setValue(historyRef.current.pop())
  }

  function changeValue(newValue) {
    historyRef.current.push(value)
    setValue(newValue)
  }

  return [value, changeValue, undo]
}

function useLocalStorage(key) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || ''
  })

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

function App() {
  const [color, setColor, undo] = useUndoState(useLocalStorage('color'))

  function changeColor(e) {
    setColor(e.target.value)
  }

  return (
    <div className="composing-state spacing">
      <div
        className="color-preview"
        style={{
          padding: '1rem',
          backgroundColor: color
        }}
      >
        <input type="color" value={color || ''} onChange={changeColor} aria-label="Color Picker" />
      </div>
      <button className="button" onClick={undo}>
        Undo
      </button>
    </div>
  )
}

export default App
