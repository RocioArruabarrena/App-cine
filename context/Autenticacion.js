import { createContext, useEffect, useReducer } from "react"
import { initDatabase, loginUser } from "../database/db"

export const Autenticacion = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case "RESTORE":
      return { ...state, isLoading: false }
    case "LOGIN":
      return { ...state, user: action.payload, isLoading: false }
    case "LOGOUT":
      return { ...state, user: null, isLoading: false }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { isLoading: true, user: null })

  useEffect(() => {
    const setup = async () => {
      await initDatabase()
      dispatch({ type: "RESTORE" })
    }
    setup()
  }, [])

  const login = async (username, password) => {
    const user = await loginUser(username, password)
    if (user) dispatch({ type: "LOGIN", payload: user })
    return user
  }

  const logout = () => dispatch({ type: "LOGOUT" })

  return (
    <Autenticacion.Provider value={{ ...state, login, logout }}>
      {children}
    </Autenticacion.Provider>
  )
}
