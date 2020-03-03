import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStar } from 'react-icons/fa'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

let z = 5
function add(x, y) {
  z = z + y
  return x + y
}

function Pokemon() {
  let [pokemon, setPokemon] = useState('pikachu')
  let [img, setImg] = useState(null)

  let title = 'Saying hello to ' + pokemon

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    let isCurrent = true
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(res => res.json())
      .then(res => {
        if (isCurrent) setImg(res.sprites.front_default)
      })
    return () => {
      isCurrent = false
    }
  }, [img, pokemon])

  return (
    <div>
      <input
        type="text"
        value={pokemon}
        onChange={event => {
          setPokemon(event.target.value)
        }}
      />
      Hello, {pokemon}!
      <img src={img} />
    </div>
  )
}

// const Button = props => {
//   let { children, onKeyboardTap } = props
//   return (
//     <button
//       className="button"
//       onClick={() => {
//         console.log('weeee')
//       }}
//       onKeyDown={e => {
//         if (e.key === 'Enter') {
//           onKeyboardTap()
//         }
//       }}
//     >
//       {children}
//     </button>
//   )
// }

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

// const reactElement = React.createElement('button', null, '+', text)
const domElement = document.getElementById('root')

ReactDOM.render(<Pokemon />, domElement)
