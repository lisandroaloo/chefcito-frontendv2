"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { TextInput, Button, Card, Text, IconButton, useTheme, Surface, Snackbar } from "react-native-paper"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"

export default function CreateRecipeScreen() {
  const [recipeName, setRecipeName] = useState("")
  const [ingredients, setIngredients] = useState([""])
  const [steps, setSteps] = useState([""])
  const navigation = useNavigation()
    const [snackbarVisible, setSnackbarVisible] = useState(false)

   const theme = useTheme()


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
    Alert.alert("Éxito", "Receta guardada correctamente", [{ text: "OK", onPress: () => navigation.goBack() }])
  }

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* Recipe Name */}
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

            {/* Image Upload */}
            <Card style={styles.imageUploadCard} mode="elevated" elevation={2}>
              <Card.Content style={styles.imageUploadContent}>
                <IconButton icon="camera" size={40} iconColor={theme.colors.secondary} />
                <Text variant="bodyMedium" style={[styles.imageUploadText, { color: theme.colors.secondary }]}>
                  Cargar imagen
                </Text>
              </Card.Content>
            </Card>

            {/* Ingredients Section */}
            <Card style={styles.section} mode="elevated" elevation={2}>
              <Card.Content style={styles.sectionContent}>
                <View style={styles.sectionHeader}>
                  <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.secondary }]}>
                    Ingredientes
                  </Text>
                  <IconButton
                    icon="plus-circle"
                    size={24}
                    iconColor={theme.colors.secondary}
                    onPress={addIngredient}
                    style={styles.addButton}
                  />
                </View>

                <View style={styles.inputsList}>
                  {ingredients.map((ingredient, index) => (
                    <TextInput
                      key={index}
                      label={`Ingrediente ${index + 1}`}
                      value={ingredient}
                      onChangeText={(value) => updateIngredient(index, value)}
                      mode="outlined"
                      style={styles.listInput}
                      theme={{
                        colors: {
                          onSurfaceVariant: "#666666",
                          primary: theme.colors.secondary,
                        },
                      }}
                    />
                  ))}
                </View>
              </Card.Content>
            </Card>

            {/* Steps Section */}
            <Card style={styles.section} mode="elevated" elevation={2}>
              <Card.Content style={styles.sectionContent}>
                <View style={styles.sectionHeader}>
                  <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.secondary }]}>
                    Paso a paso
                  </Text>
                  <IconButton
                    icon="plus-circle"
                    size={24}
                    iconColor={theme.colors.secondary}
                    onPress={addStep}
                    style={styles.addButton}
                  />
                </View>

                <View style={styles.inputsList}>
                  {steps.map((step, index) => (
                    <TextInput
                      key={index}
                      label={`Paso ${index + 1}`}
                      value={step}
                      onChangeText={(value) => updateStep(index, value)}
                      mode="outlined"
                      multiline
                      numberOfLines={3}
                      style={styles.listInput}
                      theme={{
                        colors: {
                          onSurfaceVariant: "#666666",
                          primary: theme.colors.secondary,
                        },
                      }}
                    />
                  ))}
                </View>
              </Card.Content>
            </Card>

            {/* Save Button */}
            <Button
              mode="contained"
              onPress={handleSave}
              style={[styles.saveButton, { backgroundColor: theme.colors.secondary }]}
              contentStyle={styles.saveButtonContent}
              labelStyle={styles.saveButtonLabel}
            >
              Guardar
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
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    content: {
      padding: 20,
      paddingBottom: 40,
    },
    nameInput: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      marginBottom: 20,
    },
    imageUploadCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      marginBottom: 20,
    },
    imageUploadContent: {
      alignItems: "center",
      paddingVertical: 32,
    },
    imageUploadText: {
      marginTop: 8,
      fontWeight: "600",
    },
    section: {
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      marginBottom: 20,
    },
    sectionContent: {
      padding: 20,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    sectionTitle: {
      fontWeight: "bold",
    },
    addButton: {
      margin: 0,
    },
    inputsList: {
      gap: 12,
    },
    listInput: {
      backgroundColor: "#FFFFFF",
    },
    saveButton: {
      borderRadius: 24,
      marginTop: 8,
    },
    saveButtonContent: {
      paddingVertical: 8,
    },
    saveButtonLabel: {
      fontSize: 16,
      fontWeight: "600",
    },
  })
