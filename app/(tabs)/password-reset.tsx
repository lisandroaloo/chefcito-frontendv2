"use client"

import { useState } from "react"
import { View, StyleSheet } from "react-native"
import { TextInput, Button, useTheme, Surface, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image } from 'react-native'

export default function PasswordResetScreen() {
  const theme = useTheme()

  // Estados para manejar pasos
  const [step, setStep] = useState(1) // 1: pedir email, 2: pedir código y contraseña
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Simular envío del código al mail
  const sendCodeToEmail = () => {
    if (!email) {
      alert("Por favor ingresa un email válido.")
      return
    }
    // Aquí iría la llamada real para enviar el código
    alert(`Código enviado a ${email}`)
    setStep(2)
  }

  // Validar código y cambio de contraseña
  const handleChangePassword = () => {
    if (!code) {
      alert("Por favor ingresa el código que recibiste.")
      return
    }
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.")
      return
    }
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.")
      return
    }

    // Aquí iría la llamada real para validar código y cambiar contraseña
    alert("Contraseña cambiada correctamente")
    // Por ejemplo, navegar a login u otra pantalla
    // navigation.navigate("login")
  }

  // Volver al paso 1 para corregir email y limpiar campos
  const handleChangeEmail = () => {
    setStep(1)
    setCode("")
    setPassword("")
    setConfirmPassword("")
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
            {step === 1 && (
              <>
                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
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
                  onPress={sendCodeToEmail}
                  style={[styles.changeButton, { backgroundColor: theme.colors.secondary }]}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                >
                  Enviar código
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <TextInput
                  label="Código"
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
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
                  label="Nueva contraseña"
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
                <TextInput
                  label="Confirmar contraseña"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
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
                  onPress={handleChangePassword}
                  style={[styles.changeButton, { backgroundColor: theme.colors.secondary }]}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                >
                  Cambiar contraseña
                </Button>

                <Text
                  onPress={handleChangeEmail}
                  style={{
                    marginTop: 16,
                    textAlign: "center",
                    color: theme.colors.secondary,
                    textDecorationLine: "underline",
                    fontSize: 14,
                  }}
                >
                  ¿Te equivocaste de email? Cambiar email
                </Text>
              </>
            )}
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
  formContainer: {
    gap: 16,
  },
  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  inputContent: {
    paddingHorizontal: 16,
  },
  changeButton: {
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
