import { createStore, combineReducers } from 'redux'

const initialState = { count: 0 }

const counterReducer = (state, action) => {
  if (typeof state === 'undefined') return initialState
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }
    case 'DECREMENT':
      return { ...state, count: state.count - 1 }
    default:
      return state
  }
}

function authReducer(state, action) {
  return state
}

const reducers = combineReducers({
  counterState: counterReducer,
  authState: authReducer
})
const store = createStore(reducers)

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
