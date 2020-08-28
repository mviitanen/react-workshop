import React from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStar } from 'react-icons/fa'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function App(props) {
  return (
    <div>
      <OtherComponent></OtherComponent>
    </div>
  )
}

ReactDOM.render(<App message="hello again" />, document.getElementById('root'))
