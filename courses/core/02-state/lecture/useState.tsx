// For Reference
import React from 'react'
import ReactDOM from 'react-dom'
import Quantity from './Quantity'

const states: any[] = []
let calls = -1

function useState(value: any) {
  const call = ++calls

  if (states[call]) {
    return states[call]
  }

  function setState(newValue: any) {
    states[call][0] = newValue
    reRender()
  }

  const state = [value, setState]
  states[call] = state
  return state
}

function reRender() {
  calls = -1
  ReactDOM.render(<Quantity />, document.getElementById('root'))
}
