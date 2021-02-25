import React, { useContext, useRef, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

///////////
const AuthContext = React.createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState({ name: 'brad' })
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

///////////

/**
 * This is JS and not TS on purpose to help explain context
 * without the extra noise TS brings to it.
 */

const ThemeContext = React.createContext()

export const App = () => {
  const colors = getTheme()
  console.log(colors)

  return (
    <AuthProvider>
      <ThemeContext.Provider value={colors}>
        <PrimaryLayout />
      </ThemeContext.Provider>
    </AuthProvider>
  )
}

const PrimaryLayout = () => {
  return <Board />
}

const Board = () => {
  const user = useAuth()
  console.log(user)
  return <TaskCard />
}

const TaskCard = () => {
  const taskRef = useRef()

  const colors = useContext(ThemeContext)

  useEffect(() => {
    taskRef.current.style.setProperty(`--taskColor`, colors.blue)
  }, [colors])

  return (
    <div className="task-card spacing" ref={taskRef}>
      <Heading>Task Card</Heading>
      <span>{colors?.blue}</span>
    </div>
  )
}
