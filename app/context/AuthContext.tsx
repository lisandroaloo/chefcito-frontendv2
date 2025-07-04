import { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { login as apiLogin, logout as apiLogout, getStoredUser, getStoredUserId } from "../api/auth"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getStoredUser()
      const storedId = await getStoredUserId()
      setUser(storedUser)
      setUserId(storedId)
      setLoading(false)
    }
    console.log("LOG")
    loadUser()
  }, [user])

  const login = async (alias: string, password: string) => {
    const { user: user, id } = await apiLogin(alias, password)
    console.log(id);
    
    setUser(user)
    setUserId(id)
  }


  const logout = async () => {
    await apiLogout()
    setUser(null)
    setUserId(null)
  }

  return (
    <AuthContext.Provider value={{ user, userId, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
