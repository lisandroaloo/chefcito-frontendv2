"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from "react-native"

export default function CodeVerificationScreen({ navigation }: any) {
  const [code, setCode] = useState("")

  const handleContinue = () => {
    navigation.navigate("Home")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../assets/chefcito-logo.png")} style={styles.logo} resizeMode="contain" />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Code"
            value={code}
            onChangeText={setCode}
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF9500",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  form: {
    width: "100%",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#8B4513",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})
