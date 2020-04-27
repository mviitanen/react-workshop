import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'

/**
 * 1. Start by creating some state to store an array of items
 *    where you have the array holding objects as shown below
 * 2. Eventually, your array will start empty, but for now it might
 *    make sense to have that array already populated with an item
 *    or two so that way we can show them in the `<ul>`. So do that
 *    and then iterate over the `items` array in the JSX and make
 *    the dynamic `<li>`s. For now, the buttons don't need events.
 * 3. The next step is to make the `<form>` work. When the user
 *    submits the form, add the item to your array.
 * 4. When the item is complete, the complete button should update
 *    the item record in the state to be complete: true.
 */

function Todo() {
  const [items, setItems] = useState([])
  const fieldRef = useRef()

  function handleSubmit(event) {
    event.preventDefault()

    setItems(
      items.concat([
        {
          item: fieldRef.current.value,
          complete: false
        }
      ])
    )
    fieldRef.current.value = ''
    fieldRef.current.focus()
  }

  function complete(index, complete = true) {
    const newItem = { ...items[index], complete }
    const newItems = [
      ...items.slice(0, index),
      newItem,
      ...items.slice(index + 1, items.length)
    ]
    setItems(newItems)
  }

  function remove(index) {
    const newItems = [
      ...items.slice(0, index),
      ...items.slice(index + 1, items.length)
    ]
    setItems(newItems)
  }

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={fieldRef} />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {items.map((item, index) => {
          return (
            <li key={index}>
              {item.complete ? (
                <strike>{item.item}</strike>
              ) : (
                <span>{item.item}</span>
              )}
              <button onClick={() => remove(index)}>Remove</button>
              <button onClick={() => complete(index, !item.complete)}>
                {item.complete ? 'Undo Complete' : 'Complete'}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

ReactDOM.render(<Todo />, document.getElementById('root'))
