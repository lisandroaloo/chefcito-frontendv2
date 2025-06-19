"use client"

import { useState } from "react"
import { View, StyleSheet } from "react-native"
import { TextInput, Button, useTheme, Surface, Text } from "react-native-paper"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image } from 'react-native';

import { useNavigation } from "@react-navigation/native"



export default function LoginScreen() {
  const [alias, setAlias] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useNavigation()
    const theme = useTheme()


  const handleLogin = () => {
      navigation.navigate("home") // el nombre de la ruta registrada en el stack
   }


  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo Section - Exact match to Figma */}
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
             <Image source={require("../../assets/chefcito-logo.png")} style={styles.logo} resizeMode="contain" />
            </View>
          </View>

          {/* Form Section - Exact Material 3 styling */}
          <View style={styles.formContainer}>
            <TextInput
              label="Alias"
              value={alias}
              onChangeText={setAlias}
              mode="filled"
              style={styles.textInput}
              contentStyle={styles.inputContent}
              theme={{
                colors: {
                  onSurfaceVariant: "#666666",
                  primary: theme.colors.secondary,
                },
              }}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              mode="filled"
              style={styles.textInput}
              contentStyle={styles.inputContent}
              theme={{
                colors: {
                  onSurfaceVariant: "#666666",
                  primary: theme.colors.secondary,
                },
              }}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              style={[styles.loginButton, { backgroundColor: theme.colors.secondary }]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Log in
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  logoWrapper: {
    alignItems: "center",
  },
  chefEmoji: {
    fontSize: 120,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  formContainer: {
    gap: 16,
  },
  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  inputContent: {
    paddingHorizontal: 16,
  },
  loginButton: {
    marginTop: 8,
    borderRadius: 24,
  },
  buttonContent: {
    paddingVertical: 8,
  },
   logo: {
         width: 200,
         height: 200,
         marginBottom: 50,
       },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
})
