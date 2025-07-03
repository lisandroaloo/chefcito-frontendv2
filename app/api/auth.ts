import AsyncStorage from "@react-native-async-storage/async-storage"


export async function login(username: string, password: string): Promise<void> {
  const response = await fetch("http://localhost:8080/api/user/login", {
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

  return data.user
}


export async function logout() {
  await AsyncStorage.clear()
}

export async function getStoredUser() {
  const user = await AsyncStorage.getItem("user")
  return user ? JSON.parse(user) : null
}
