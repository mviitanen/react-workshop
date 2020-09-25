import React, { useState, useRef, useEffect } from 'react'
// import { useUndoState, useLocalStorage } from './utils'

// 2. Make our own useLocalStorage:
//    [value, setValue] = useLocalStorage(name)
// 3. Refactor them so they can be composed

function useUndoState(state) {
  const [value, setValue] = state
  const historyRef = useRef([])

  function undo() {
    setValue(historyRef.current.pop())
  }

  function changeValue(newValue) {
    historyRef.current.push(value)
    setValue(newValue)
  }

  return [value, changeValue, undo]
}

function useLocalStorage(key, state) {
  const [value, setValue] = state

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

function App() {
  const [color, setColor, undo] = useUndoState(
    useLocalStorage(
      'color',
      useState(() => {
        return localStorage.getItem('color')
      })
    )
  )

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
