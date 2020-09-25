import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure'
import './styles.scss'

// Incase you want to test your onChange with icons
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

function App() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Disclosure onChange={setIsOpen} defaultOpen={isOpen}>
      <DisclosureButton>
        {isOpen ? <FaAngleDown /> : <FaAngleRight />}
        <span>Click Me</span>
      </DisclosureButton>
      <DisclosurePanel>Panel Info</DisclosurePanel>
    </Disclosure>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
