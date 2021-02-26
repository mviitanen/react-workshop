import React, { useContext, useRef, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
  const context = {} // 100s
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw Error('')
  }
  return context
}

///////////////

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
  return <TaskCard />
}

const TaskCard = () => {
  const taskRef = useRef()
  const colors = useContext(ThemeContext)
  const auth = useAuth()

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
