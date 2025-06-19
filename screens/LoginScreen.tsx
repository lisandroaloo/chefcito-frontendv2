"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from "react-native"

export default function LoginScreen({ navigation }: any) {
  const [alias, setAlias] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    navigation.navigate("Home")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../assets/chefcito-logo.png")} style={styles.logo} resizeMode="contain" />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Alias"
            value={alias}
            onChangeText={setAlias}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log in</Text>
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
