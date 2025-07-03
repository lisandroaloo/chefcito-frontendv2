"use client"

import React, { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native"
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
import { SafeAreaView } from "react-native-safe-area-context"
import { Picker } from "@react-native-picker/picker" // Import Picker
import { useGetRecipesByUser } from "../hooks/useGetRecipesByUser"
import { IRecipe } from "../hooks/useCreateRecipe"
import { useRouter } from "expo-router"
import { useAuth } from "../context/AuthContext"

export default function EditRecipeScreen() {
  const theme = useTheme()

   const { user } = useAuth()
  const { recipes, loading: loadingRecipes } = useGetRecipesByUser(user)

  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null)
  const [editingRecipe, setEditingRecipe] = useState<any | null>(null)
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()


  // Form fields

  const [recipeName, setRecipeName] = useState("")
  const [ingredients, setIngredients] = useState([""])
  const [steps, setSteps] = useState([""])
  const [isVegan, setIsVegan] = useState(false)
  const [isVegetarian, setIsVegetarian] = useState(false)
  const [isCeliac, setIsCeliac] = useState(false)
  const [isLactoseFree, setIsLactoseFree] = useState(false)

  useEffect(() => {
    // Only attempt to set editingRecipe if recipes have loaded and a recipe ID is selected
    if (!loadingRecipes && recipes.length > 0 && selectedRecipeId) {

      const recipe = recipes.find((r) => r.re_id == selectedRecipeId)
      console.log(recipes);

      if (recipe) {
        setEditingRecipe(recipe)
        setRecipeName(recipe.re_title)
        setIngredients(recipe.ingredients || [""])
        setSteps(recipe.steps || [""])
        setIsVegan(recipe.re_suitable_for_vegan)
        setIsVegetarian(recipe.re_suitable_for_vegetarian)
        setIsCeliac(recipe.re_suitable_for_celiac)
        setIsLactoseFree(recipe.re_suitable_for_lactose_intolerant)
      }
    } else if (!selectedRecipeId) {
      // If no recipe is selected, clear the form
      setEditingRecipe(null)
      setRecipeName("")
      setIngredients([""])
      setSteps([""])
      setIsVegan(false)
      setIsVegetarian(false)
      setIsCeliac(false)
      setIsLactoseFree(false)
    }
  }, [selectedRecipeId, recipes, loadingRecipes])

  // Set the first recipe as selected by default once recipes load, if none is selected
  useEffect(() => {
    if (!loadingRecipes && recipes.length > 0 && selectedRecipeId === null) {
      setSelectedRecipeId(recipes[0].re_id);
    }
  }, [loadingRecipes, recipes, selectedRecipeId]);


  const handleUpdate = async () => {
    if (!editingRecipe) return

    const updatedRecipe: IRecipe = {
      ...editingRecipe,
      title: recipeName,
      ingredients: ingredients.filter((i) => i.trim() !== ""),
      steps: steps.filter((s) => s.trim() !== ""),
      vegan: isVegan,
      vegetarian: isVegetarian,
      celiac: isCeliac,
      lactose: isLactoseFree,
    }

    try {
      setSaving(true)
      const res = await fetch(
        `http://localhost:8080/api/recipe/${editingRecipe.re_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRecipe),
        }
      )
      if (!res.ok) throw new Error("Error al actualizar receta")
      setSnackbarVisible(true)
    } catch (err) {
      Alert.alert("Error", "No se pudo actualizar la receta.")
    } finally {
      setSaving(false)
      setTimeout(() => router.replace("/profile"), 1000)

    }
  }

  const addIngredient = () => setIngredients([...ingredients, ""])
  const removeIngredient = (index: number) =>
    setIngredients(ingredients.filter((_, i) => i !== index))
  const updateIngredient = (index: number, value: string) => {
    const newList = [...ingredients]
    newList[index] = value
    setIngredients(newList)
  }

  const addStep = () => setSteps([...steps, ""])
  const removeStep = (index: number) =>
    setSteps(steps.filter((_, i) => i !== index))
  const updateStep = (index: number, value: string) => {
    const newList = [...steps]
    newList[index] = value
    setSteps(newList)
  }

  return (
    <Surface
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Selector de receta */}
          <Card style={styles.section} mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={styles.pickerLabel}>
                Seleccioná una receta para editar
              </Text>
              {loadingRecipes ? (
                <ActivityIndicator animating={true} color={theme.colors.secondary} size="large" />
              ) : (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedRecipeId}
                    onValueChange={(itemValue) => setSelectedRecipeId(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {/* Add a default disabled item */}
                    <Picker.Item label="-- Seleccionar Receta --" value={null} enabled={false} />
                    {recipes.map((r, index) => (
                      <Picker.Item key={index} label={r.re_title} value={r.re_id} />
                    ))}
                  </Picker>
                </View>
              )}
            </Card.Content>
          </Card>

          {/* Formulario visible solo si hay receta seleccionada */}
          {editingRecipe && (
            <>
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

              {/* Ingredientes */}
              <Card style={styles.section} mode="elevated" elevation={2}>
                <Card.Content>
                  <View style={styles.sectionHeader}>
                    <Text
                      variant="titleMedium"
                      style={[
                        styles.sectionTitle,
                        { color: theme.colors.secondary },
                      ]}
                    >
                      Ingredientes
                    </Text>
                    <IconButton
                      icon="plus-circle"
                      size={24}
                      iconColor={theme.colors.secondary}
                      onPress={addIngredient}
                    />
                  </View>
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
                      <IconButton
                        icon="trash-can"
                        size={24}
                        iconColor="red"
                        onPress={() => removeIngredient(index)}
                      />
                    </View>
                  ))}
                </Card.Content>
              </Card>

              {/* Pasos */}
              <Card style={styles.section} mode="elevated" elevation={2}>
                <Card.Content>
                  <View style={styles.sectionHeader}>
                    <Text
                      variant="titleMedium"
                      style={[
                        styles.sectionTitle,
                        { color: theme.colors.secondary },
                      ]}
                    >
                      Paso a paso
                    </Text>
                    <IconButton
                      icon="plus-circle"
                      size={24}
                      iconColor={theme.colors.secondary}
                      onPress={addStep}
                    />
                  </View>
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
                      <IconButton
                        icon="trash-can"
                        size={24}
                        iconColor="red"
                        onPress={() => removeStep(index)}
                      />
                    </View>
                  ))}
                </Card.Content>
              </Card>

              {/* Restricciones */}
              <Card style={styles.section} mode="elevated" elevation={2}>
                <Card.Content>
                  <Text
                    variant="titleMedium"
                    style={[
                      styles.sectionTitle,
                      { color: theme.colors.secondary },
                    ]}
                  >
                    Restricciones alimentarias
                  </Text>
                  <Checkbox.Item
                    label="Vegano"
                    status={isVegan ? "checked" : "unchecked"}
                    onPress={() => setIsVegan(!isVegan)}
                  />
                  <Checkbox.Item
                    label="Vegetariano"
                    status={isVegetarian ? "checked" : "unchecked"}
                    onPress={() => setIsVegetarian(!isVegetarian)}
                  />
                  <Checkbox.Item
                    label="Apto celíacos"
                    status={isCeliac ? "checked" : "unchecked"}
                    onPress={() => setIsCeliac(!isCeliac)}
                  />
                  <Checkbox.Item
                    label="Sin lactosa"
                    status={isLactoseFree ? "checked" : "unchecked"}
                    onPress={() => setIsLactoseFree(!isLactoseFree)}
                  />
                </Card.Content>
              </Card>

              {/* Botón guardar */}
              <Button
                mode="contained"
                onPress={handleUpdate}
                disabled={saving}
                style={[
                  styles.saveButton,
                  { backgroundColor: theme.colors.secondary },
                ]}
                contentStyle={styles.saveButtonContent}
                labelStyle={styles.saveButtonLabel}
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </Button>
            </>
          )}
        </ScrollView>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000}
        >
          ¡Receta actualizada correctamente!
        </Snackbar>
      </SafeAreaView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  nameInput: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginBottom: 20,
  },
  section: { backgroundColor: "#FFFFFF", borderRadius: 12, marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: { fontWeight: "bold" },
  inputRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  listInput: { backgroundColor: "#FFFFFF" },
  saveButton: { borderRadius: 24, marginTop: 8 },
  saveButtonContent: { paddingVertical: 8 },
  saveButtonLabel: { fontSize: 16, fontWeight: "600" },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#CCCCCC", // You can adjust this color
    borderRadius: 8,
    overflow: "hidden", // Ensures the picker doesn't go outside rounded corners
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  picker: {
    height: 50, // Adjust height as needed
    width: "100%",
  },
  pickerItem: {
    // You can style individual picker items here if needed
  },
  pickerLabel: {
    marginBottom: 8,
    color: "#666666", // Match TextInput label color
  },
})