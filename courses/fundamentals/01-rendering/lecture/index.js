// import h from './h.js'
import React from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStar } from 'react-icons/fa'
import './styles.scss'

// ;<div className="title">hello there again</div>

// domElement.style['color'] = 'red'
// domElement.style['fontWeight'] = 700

function getTitle(transform) {
  return transform('Click me')
}

// It's Just JavaScript
function Button({ children, onEnter }) {
  console.log('children', children)

  return (
    <button
      onKeyDown={event => {
        if (event.key === 'Enter') {
          onEnter(event)
        }
      }}
      className="render_button"
      style={{
        backgroundColor: 'tomato',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </button>
  )
}

let btn = <Button />
console.log(btn)

let domElement = document.querySelector('#root')
ReactDOM.render(btn, domElement)
