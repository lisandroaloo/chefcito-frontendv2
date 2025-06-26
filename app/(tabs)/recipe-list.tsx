"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Card, IconButton, useTheme, Surface, Text, Searchbar } from "react-native-paper"
import { useRoute, useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRecipes } from "../hooks/useRecipes"

export default function RecipeListScreen() {
  const theme = useTheme()
  const route = useRoute()
  const navigation = useNavigation()
  const { category } = route.params || {}

  const { recipes, loading, error } = useRecipes(category)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRecipes = recipes.filter((recipe: any) =>
    recipe.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRecipePress = (recipe: any) => {
    navigation.navigate("recipe-detail", { recipe })
  }

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Buscar recetas"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {loading && <Text style={{ color: theme.colors.secondary, textAlign: "center" }}>Cargando...</Text>}
          {error && <Text style={{ color: "red", textAlign: "center" }}>Error al cargar recetas</Text>}
          {!loading && !error && filteredRecipes.length === 0 && (
            <Text style={{ color: theme.colors.secondary, textAlign: "center" }}>
              No se encontraron recetas para "{searchQuery}"
            </Text>
          )}

          <View style={styles.grid}>
            {filteredRecipes.map((recipe: any, index: number) => (
              <Card
                key={index}
                style={styles.recipeCard}
                onPress={() => handleRecipePress(recipe)}
                mode="elevated"
              >
                <Card.Content style={styles.cardContent}>
                  <View style={styles.recipeImagePlaceholder}>
                    <IconButton
                      icon="silverware-fork-knife"
                      size={32}
                      iconColor={theme.colors.secondary}
                      style={styles.recipeIcon}
                    />
                  </View>
                  <Text variant="bodyMedium" style={[styles.recipeTitle, { color: theme.colors.secondary }]}>
                    {recipe.name}
                  </Text>
                </Card.Content>
              </Card>
            ))}
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
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchbar: {
    elevation: 4,
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  recipeCard: {
    width: "48%",
    marginBottom: 16,
  },
  cardContent: {
    alignItems: "center",
    paddingVertical: 16,
  },
  recipeImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  recipeIcon: {
    margin: 0,
  },
  recipeTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
})
