"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import {
  TextInput,
  Button,
  Card,
  Text,
  IconButton,
  useTheme,
  Surface,
  Snackbar,
  Checkbox,
} from "react-native-paper"
import { router, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import React from "react"
import { useCreateRecipe } from "../hooks/useCreateRecipe" // Asegurate que la ruta sea correcta

export default function CreateRecipeScreen() {
  const [recipeName, setRecipeName] = useState("")
  const [ingredients, setIngredients] = useState([""])
  const [steps, setSteps] = useState([""])
  const [snackbarVisible, setSnackbarVisible] = useState(false)

  const [isVegan, setIsVegan] = useState(false)
  const [isVegetarian, setIsVegetarian] = useState(false)
  const [isCeliac, setIsCeliac] = useState(false)
  const [isLactoseFree, setIsLactoseFree] = useState(false)

  const theme = useTheme()
  const router = useRouter()

  const { createRecipe, loading, error } = useCreateRecipe()

  const addIngredient = () => setIngredients([...ingredients, ""])
  const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index))
  const updateIngredient = (index: number, value: string) => {
    const newList = [...ingredients]
    newList[index] = value
    setIngredients(newList)
  }

  const addStep = () => setSteps([...steps, ""])
  const removeStep = (index: number) => setSteps(steps.filter((_, i) => i !== index))
  const updateStep = (index: number, value: string) => {
    const newList = [...steps]
    newList[index] = value
    setSteps(newList)
  }

  const handleSave = async () => {
    const recipeToSend = {
      us_id: 1,
      picture: "text",
      title: recipeName,
      vegan: isVegan,
      vegetarian: isVegetarian,
      celiac: isCeliac,
      lactose: isLactoseFree,
      ingredients: ingredients.filter((i) => i.trim() !== ""),
      steps: steps.filter((s) => s.trim() !== ""),
    }


    try {
      await createRecipe(recipeToSend)
      setSnackbarVisible(true)
      setTimeout(() => router.replace("/profile"), 1500)
    } catch (err) {
      Alert.alert("Error", "No se pudo guardar la receta.")
    }
  }

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Nombre */}
          <TextInput
            label="Nombre"
            value={recipeName}
            onChangeText={setRecipeName}
            mode="filled"
            style={styles.nameInput}
            theme={{
              colors: {
                onSurfaceVariant: "#666666",
                primary: theme.colors.secondary,
              },
            }}
          />

          {/* Imagen (futura carga) */}
          <Card style={styles.imageUploadCard} mode="elevated" elevation={2}>
            <Card.Content style={styles.imageUploadContent}>
              <IconButton icon="camera" size={40} iconColor={theme.colors.secondary} />
              <Text variant="bodyMedium" style={[styles.imageUploadText, { color: theme.colors.secondary }]}>
                Cargar imagen
              </Text>
            </Card.Content>
          </Card>

          {/* Ingredientes */}
          <Card style={styles.section} mode="elevated" elevation={2}>
            <Card.Content style={styles.sectionContent}>
              <View style={styles.sectionHeader}>
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.secondary }]}>
                  Ingredientes
                </Text>
                <IconButton icon="plus-circle" size={24} iconColor={theme.colors.secondary} onPress={addIngredient} />
              </View>
              <View style={styles.inputsList}>
                {ingredients.map((ingredient, index) => (
                  <View key={index} style={styles.inputRow}>
                    <TextInput
                      label={`Ingrediente ${index + 1}`}
                      value={ingredient}
                      onChangeText={(val) => updateIngredient(index, val)}
                      mode="outlined"
                      style={[styles.listInput, { flex: 1 }]}
                      theme={{
                        colors: {
                          onSurfaceVariant: "#666666",
                          primary: theme.colors.secondary,
                        },
                      }}
                    />
                    <IconButton icon="trash-can" size={24} iconColor="red" onPress={() => removeIngredient(index)} />
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Pasos */}
          <Card style={styles.section} mode="elevated" elevation={2}>
            <Card.Content style={styles.sectionContent}>
              <View style={styles.sectionHeader}>
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.secondary }]}>
                  Paso a paso
                </Text>
                <IconButton icon="plus-circle" size={24} iconColor={theme.colors.secondary} onPress={addStep} />
              </View>
              <View style={styles.inputsList}>
                {steps.map((step, index) => (
                  <View key={index} style={styles.inputRow}>
                    <TextInput
                      label={`Paso ${index + 1}`}
                      value={step}
                      onChangeText={(val) => updateStep(index, val)}
                      mode="outlined"
                      multiline
                      numberOfLines={3}
                      style={[styles.listInput, { flex: 1 }]}
                      theme={{
                        colors: {
                          onSurfaceVariant: "#666666",
                          primary: theme.colors.secondary,
                        },
                      }}
                    />
                    <IconButton icon="trash-can" size={24} iconColor="red" onPress={() => removeStep(index)} />
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Restricciones */}
          <Card style={styles.section} mode="elevated" elevation={2}>
            <Card.Content style={styles.sectionContent}>
              <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.secondary }]}>
                Restricciones alimentarias
              </Text>
              <Checkbox.Item label="Vegano" status={isVegan ? "checked" : "unchecked"} onPress={() => setIsVegan(!isVegan)} />
              <Checkbox.Item label="Vegetariano" status={isVegetarian ? "checked" : "unchecked"} onPress={() => setIsVegetarian(!isVegetarian)} />
              <Checkbox.Item label="Apto celíacos" status={isCeliac ? "checked" : "unchecked"} onPress={() => setIsCeliac(!isCeliac)} />
              <Checkbox.Item label="Sin lactosa" status={isLactoseFree ? "checked" : "unchecked"} onPress={() => setIsLactoseFree(!isLactoseFree)} />
            </Card.Content>
          </Card>

          {/* Botón guardar */}
          <Button
            mode="contained"
            onPress={handleSave}
            disabled={loading}
            style={[styles.saveButton, { backgroundColor: theme.colors.secondary }]}
            contentStyle={styles.saveButtonContent}
            labelStyle={styles.saveButtonLabel}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </ScrollView>

        <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={2000}>
          ¡Receta guardada correctamente!
        </Snackbar>
      </SafeAreaView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  nameInput: { backgroundColor: "rgba(255, 255, 255, 0.9)", marginBottom: 20 },
  imageUploadCard: { backgroundColor: "#FFFFFF", borderRadius: 12, marginBottom: 20 },
  imageUploadContent: { alignItems: "center", paddingVertical: 32 },
  imageUploadText: { marginTop: 8, fontWeight: "600" },
  section: { backgroundColor: "#FFFFFF", borderRadius: 12, marginBottom: 20 },
  sectionContent: { padding: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  sectionTitle: { fontWeight: "bold" },
  inputsList: { gap: 12 },
  listInput: { backgroundColor: "#FFFFFF" },
  inputRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  saveButton: { borderRadius: 24, marginTop: 8 },
  saveButtonContent: { paddingVertical: 8 },
  saveButtonLabel: { fontSize: 16, fontWeight: "600" },
})
