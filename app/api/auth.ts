import AsyncStorage from "@react-native-async-storage/async-storage"


// api/auth.ts
export async function login(username: string, password: string): Promise<{ user: string; id: number }> {
  const response = await fetch("https://chefcito-backtend-production.up.railway.app/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error?.message || "Error al iniciar sesión")
  }

  const data = await response.json()

  await AsyncStorage.setItem("user", JSON.stringify(data.us_alias))
  await AsyncStorage.setItem("id", JSON.stringify(data.us_id))

  return { user: data.us_alias, id: data.us_id }
}



export async function logout() {
  await AsyncStorage.clear()
}

export async function getStoredUser() {
  const user = await AsyncStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export async function getStoredUserId() {
  const id = await AsyncStorage.getItem("id")
  return id ? JSON.parse(id) : null
}
