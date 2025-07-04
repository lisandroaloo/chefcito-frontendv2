"use client"

import { useState } from "react"
import { View, StyleSheet } from "react-native"
import { TextInput, Button, useTheme, Surface, Text } from "react-native-paper"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image } from 'react-native';
import React from "react"



export default function CodeVerificationScreen() {
  const [code, setCode] = useState("")
  const theme = useTheme()


  const handleContinue = () => {
      navigation.navigate("home")
  }

return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
             <Image source={require("../../assets/chefcito-logo.png")} style={styles.logo} resizeMode="contain" />
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <TextInput
              label="Code"
              value={code}
              onChangeText={setCode}
              mode="filled"
              keyboardType="numeric"
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
              onPress={handleContinue}
              style={[styles.continueButton, { backgroundColor: theme.colors.secondary }]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Continue
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
     logo: {
           width: 200,
           height: 200,
           marginBottom: 50,
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
  continueButton: {
    marginTop: 8,
    borderRadius: 24,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
})
