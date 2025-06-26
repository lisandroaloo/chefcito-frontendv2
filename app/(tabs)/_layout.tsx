"use client"

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from "react-native-paper"
import { AuthProvider } from "../context/AuthContext" // ajustá el path si hace falta



import { Stack } from "expo-router"

import "react-native-reanimated"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const chefcitoTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#FFAE52", // Orange from design
    onPrimary: "#FFFFFF",
    primaryContainer: "#FFE4CC",
    onPrimaryContainer: "#8B4513",
    secondary: "#8B4513", // Brown from design
    onSecondary: "#FFFFFF",
    secondaryContainer: "#D2B48C",
    onSecondaryContainer: "#5D2F0A",
    surface: "#FFFFFF",
    onSurface: "#1C1B1F",
    surfaceVariant: "#F3F3F3",
    onSurfaceVariant: "#49454F",
    background: "#FFAE52", // Orange background
    onBackground: "#1C1B1F",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    outline: "#79747E",
    outlineVariant: "#CAC4D0",
  },
}


export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return nullr
  }

return (
        <AuthProvider>
    <PaperProvider theme={chefcitoTheme}>
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
      <StatusBar style="light" />
    </PaperProvider>
        </AuthProvider>

  )
}