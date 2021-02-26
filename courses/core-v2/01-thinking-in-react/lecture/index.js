import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

function App() {
  function removeTask() {
    // logic for removing a task
  }

  const boards = [
    { id: 1, name: 'Board One' },
    { id: 2, name: 'Board Two' },
    { id: 3, name: 'Board Three' },
  ]

  return (
    <div>
      {boards.map((board) => {
        return (
          <div key={board.id} className="board-item">
            <span>{board.name}</span>
            <Button onClick={removeTask}>
              <FaTrash color="red" />
              <span>Remove Board</span>
            </Button>
          </div>
        )
      })}
    </div>
  )
}

React.createElement('button', {
  className: 'button',
})

ReactDOM.render(<App />, document.getElementById('root'))
