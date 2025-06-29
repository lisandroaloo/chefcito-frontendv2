import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native"
import { Card, Text, IconButton, useTheme, Surface } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams } from "expo-router"
import { useRecipeDetail } from "@/app/hooks/useRecipeDetail"

export default function RecipeDetailScreen() {
const { re_id } = useLocalSearchParams();
  const theme = useTheme()
  const { recipe, loading, error } = useRecipeDetail(re_id)


  if (loading) {
    return (
      <Surface
        style={[
          styles.container,
          { backgroundColor: theme.colors.background, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.secondary} />
      </Surface>
    )
  }

  if (error) {
    return (
      <Surface
        style={[
          styles.container,
          { backgroundColor: theme.colors.background, justifyContent: "center", alignItems: "center", padding: 20 },
        ]}
      >
        <Text variant="bodyLarge" style={{ color: "red", textAlign: "center" }}>
          {error}
        </Text>
      </Surface>
    )
  }

  if (!recipe) {
    return null
  }

  // Campos según respuesta del backend
  const ingredients: string[] = recipe.ingredients ?? []
  const steps: string[] = recipe.steps ?? []
  const title: string = recipe.re_title ?? "Receta sin título"
  const imageUri: string =
    recipe.re_picture ?? "https://via.placeholder.com/400x200/FF9500/FFFFFF?text=Imagen+no+disponible"
  const description: string = recipe.description ?? "Descripción no disponible."

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Imagen receta */}
          <Image source={{ uri: imageUri }} style={styles.recipeImage} />

          <View style={styles.content}>
            {/* Título y favorito */}
            <View style={styles.header}>
              <Text variant="headlineMedium" style={[styles.title, { color: "#FFFFFF" }]}>
                {title}
              </Text>
              <IconButton icon="heart-outline" size={24} iconColor="#FFFFFF" onPress={() => {}} />
            </View>

            {/* Rating de ejemplo */}
            <View style={styles.rating}>
              {[1, 2, 3].map((star) => (
                <IconButton key={star} icon="star" size={20} iconColor="#FFD700" style={styles.star} />
              ))}
              {[4, 5].map((star) => (
                <IconButton key={star} icon="star-outline" size={20} iconColor="#FFD700" style={styles.star} />
              ))}
            </View>
       
            {/* Ingredientes */}
            <Card style={styles.section} mode="elevated" elevation={2}>
              <Card.Content style={styles.sectionContent}>
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.secondary }]}>
                  Ingredientes
                </Text>
                <View style={styles.ingredientsList}>
                  {ingredients.length > 0 ? (
                    ingredients.map((ingredient, index) => (
                      <View key={index} style={styles.ingredientItem}>
                        <Text variant="bodyMedium" style={styles.ingredientText}>
                          • {ingredient}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text variant="bodyMedium">No hay ingredientes listados.</Text>
                  )}
                </View>
              </Card.Content>
            </Card>

            {/* Pasos */}
            <Card style={styles.section} mode="elevated" elevation={2}>
              <Card.Content style={styles.sectionContent}>
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.secondary }]}>
                  Paso a paso
                </Text>
                <View style={styles.stepsList}>
                  {steps.length > 0 ? (
                    steps.map((step, index) => (
                      <View key={index} style={styles.stepItem}>
                        <View style={styles.stepNumberContainer}>
                          <Text variant="bodyMedium" style={[styles.stepNumber, { color: theme.colors.secondary }]}>
                            {index + 1}
                          </Text>
                        </View>
                        <Text variant="bodyMedium" style={styles.stepText}>
                          {step}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text variant="bodyMedium">No hay pasos listados.</Text>
                  )}
                </View>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
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
  recipeImage: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
    marginBottom: 16,
    marginLeft: -8,
  },
  star: {
    margin: 0,
  },
  description: {
    marginBottom: 24,
    lineHeight: 24,
  },
  section: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  sectionContent: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  ingredientsList: {
    gap: 8,
  },
  ingredientItem: {
    paddingVertical: 2,
  },
  ingredientText: {
    fontSize: 14,
    lineHeight: 20,
  },
  stepsList: {
    gap: 12,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stepNumberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: "bold",
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
})
