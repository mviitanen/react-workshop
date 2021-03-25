import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Select } from './Select'
// import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import './styles.scss'

function App() {
  const options = ['Banana', 'Apple', 'Kiwi']

  return (
    <div>
      <Select label="What is your favorite fruit?" options={options}></Select>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// This works OK but needs a lot more!
// - Support for proper labels for assistive technology
// - Proper keyboard event handling
// - More nuanced mouse/pointer event handling
