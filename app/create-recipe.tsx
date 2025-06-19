"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function CreateRecipeScreen() {
  const [recipeName, setRecipeName] = useState("")
  const [ingredients, setIngredients] = useState([""])
  const [steps, setSteps] = useState([""])

  const addIngredient = () => {
    setIngredients([...ingredients, ""])
  }

  const addStep = () => {
    setSteps([...steps, ""])
  }

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps]
    newSteps[index] = value
    setSteps(newSteps)
  }

  const handleSave = () => {
    Alert.alert("Éxito", "Receta guardada correctamente", [{ text: "OK", onPress: () => router.back() }])
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.form}>
          <TextInput
            style={styles.nameInput}
            placeholder="Nombre"
            value={recipeName}
            onChangeText={setRecipeName}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.imageUpload}>
            <Ionicons name="camera-outline" size={40} color="#8B4513" />
            <Text style={styles.imageUploadText}>Cargar imagen</Text>
          </TouchableOpacity>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Ingredientes</Text>
              <TouchableOpacity onPress={addIngredient} style={styles.addButton}>
                <Ionicons name="add-circle" size={24} color="#8B4513" />
              </TouchableOpacity>
            </View>

            {ingredients.map((ingredient, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder={`Ingrediente ${index + 1}`}
                value={ingredient}
                onChangeText={(value) => updateIngredient(index, value)}
                placeholderTextColor="#999"
              />
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Paso a paso</Text>
              <TouchableOpacity onPress={addStep} style={styles.addButton}>
                <Ionicons name="add-circle" size={24} color="#8B4513" />
              </TouchableOpacity>
            </View>

            {steps.map((step, index) => (
              <TextInput
                key={index}
                style={[styles.input, styles.stepInput]}
                placeholder={`Paso ${index + 1}`}
                value={step}
                onChangeText={(value) => updateStep(index, value)}
                placeholderTextColor="#999"
                multiline
              />
            ))}
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF9500",
  },
  content: {
    padding: 20,
  },
  form: {
    flex: 1,
  },
  nameInput: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  imageUpload: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    paddingVertical: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  imageUploadText: {
    marginTop: 10,
    fontSize: 16,
    color: "#8B4513",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  addButton: {
    padding: 5,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  stepInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#8B4513",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})
