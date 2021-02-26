import React, { useState, Fragment } from 'react'
// import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

// export class Minutes extends React.Component {
//   state = {
//     minutes: 0,
//     error: null,
//   }

//   subtract = () => {
//     // this.setState({
//     //   minutes: this.state.minutes - 1,
//     // })

//     this.setState((state) => {
//       return {
//         minutes: state.minutes - 1
//       }
//     })
//   }

//   add = () => {
//     this.setState({
//       minutes: this.state.minutes + 1,
//     })
//   }

//   render() {
//     return (
//       <div className="minutes">
//         <div>
//           <button onClick={this.subtract} type="button">
//             <FaMinusCircle />
//           </button>
//         </div>
//         <div>{this.state.minutes}</div>
//         <div>
//           <button onClick={this.add} type="button">
//             <FaPlusCircle />
//           </button>
//         </div>
//       </div>
//     )
//   }
// }

export const Minutes = () => {
  const [minutes, setMinutes] = useState(0)
  const [error, setError] = useState(null)

  function subtract() {
    const nextMinutes = minutes - 1
    setMinutes(nextMinutes)
    if (nextMinutes < 0) {
      setError('Cannot be less than 0')
    }
  }

  function add() {
    setMinutes(minutes + 1)
  }

  return (
    <Fragment>
      <div className="minutes">
        <div>
          <button onClick={subtract} type="button">
            <FaMinusCircle />
          </button>
        </div>

        <input
          type="text"
          value={minutes}
          onChange={(event) => {
            setMinutes(event.target.value)
          }}
        />

        <div>
          <button onClick={add} type="button">
            <FaPlusCircle />
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
    </Fragment>
  )
}
