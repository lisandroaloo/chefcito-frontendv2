import { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { login as apiLogin, logout as apiLogout, getStoredUser } from "../api/auth"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getStoredUser()
      setUser(storedUser)
      setLoading(false)
    }
    console.log("LOG")
    loadUser()
  }, [user])

  const login = async (alias: string, password: string) => {
    const user = await apiLogin(alias, password)
    setUser(user)
  }

  const logout = async () => {
    await apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
