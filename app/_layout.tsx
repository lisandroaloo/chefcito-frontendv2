"use client"

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import "react-native-reanimated"

import { useColorScheme } from "../hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="code-verification" options={{ headerShown: false }} />
        <Stack.Screen name="password-reset" options={{ headerShown: false }} />
        <Stack.Screen
          name="home"
          options={{
            title: "Chefcito",
            headerStyle: { backgroundColor: "#FF9500" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="recipe-detail"
          options={{
            title: "Chefcito",
            headerStyle: { backgroundColor: "#FF9500" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="recipe-list"
          options={{
            title: "Chefcito",
            headerStyle: { backgroundColor: "#FF9500" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="create-recipe"
          options={{
            title: "Chefcito",
            headerStyle: { backgroundColor: "#FF9500" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: "Chefcito",
            headerStyle: { backgroundColor: "#FF9500" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
