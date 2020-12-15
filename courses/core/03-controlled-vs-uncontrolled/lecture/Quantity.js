import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

class Quantity extends React.Component {
  state = {
    text: '',
  }

  onChange(event) {
    this.setState({ text: event.target.value })
  }

  render() {
    const validEmail = text.includes('@')
    return (
      <div className="quantity-picker">
        <input
          type="text"
          className={validEmail ? '' : 'text-warn'}
          value={text}
          onChange={onChange}
        />
      </div>
    )
  }
}

export default Quantity
