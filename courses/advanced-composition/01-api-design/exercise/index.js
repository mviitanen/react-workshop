import React from 'react'
import ReactDOM from 'react-dom'
import { FaAngleRight } from 'react-icons/fa'
import '../lecture/styles.scss'
import { Disclosure } from './Disclosure'

function App() {
  return <Disclosure label="Click Me">Panel Contents</Disclosure>
}

ReactDOM.render(<App />, document.getElementById('root'))
