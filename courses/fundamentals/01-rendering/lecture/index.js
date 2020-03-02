import React from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStar } from 'react-icons/fa'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const Button = props => {
  let { children, onKeyboardTap } = props
  return (
    <button
      className="button"
      onClick={() => {
        console.log('weeee')
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          onKeyboardTap()
        }
      }}
    >
      {children}
    </button>
  )
}

{
  /* <Button children={element} />
React.createElement(Button, { children: element })

<Button>{children}</Button>
React.createElement(Button, null, element)
React.createElement(Button, { children: element })

<Button>
  {el1}
  {el2}
  {stuff.map(() => {
    el3and4
  })}
</Button>

React.createElement(Button, {}, el1, el2, [el3and4])
React.createElement(Button, { children: [el1], [el2], [el3and4] }) */
}

// const reactElement = React.createElement('button', null, '+', text)
const domElement = document.getElementById('root')

ReactDOM.render(
  <div>
    <Button
      onKeyboardTap={() => {
        console.log('parents!')
      }}
    >
      <FaStar /> Add
    </Button>
    <Button>
      Minus <FaRegStar />
    </Button>
  </div>,
  domElement
)
