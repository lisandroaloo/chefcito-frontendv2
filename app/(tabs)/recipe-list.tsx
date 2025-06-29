"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Card, IconButton, useTheme, Surface, Text, Searchbar, Menu, Divider, Button } from "react-native-paper"
import { useRoute, useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRecipes } from "../hooks/useRecipes"
import { useRouter } from "expo-router"
import React from "react"

export default function RecipeListScreen() {
  const theme = useTheme()
  const route = useRoute()
  const router = useRouter()
  const [ingredientFilter, setIngredientFilter] = useState<string | null>(null)
  const [menuVisible, setMenuVisible] = useState(false)
  const { category } = route.params || {}

  const { recipes, loading, error } = useRecipes(category)

  const [searchQuery, setSearchQuery] = useState("")

// Lista única y ordenada de ingredientes (en minúsculas)
  const allIngredients2 = Array.from(
    new Set(
      recipes.flatMap((r) =>
        r.ingredients
          ? r.ingredients.map((ing: string) => ing.toLowerCase())
          : []
      )
    )
  ).sort()

  const allIngredients = ["tomate", "cebolla", "ajo", "pollo", "queso", "lechuga"]


  // Filtro por título (palabras que empiezan con searchQuery)
  const filteredByTitle = recipes.filter((recipe) => {
    if (!recipe.re_title) return false
    const words = recipe.re_title.toLowerCase().split(" ")
    return words.some((word: string) =>
      word.startsWith(searchQuery.toLowerCase())
    )
  })

  // Filtro combinado por ingrediente si hay filtro activo
  const filteredRecipes = ingredientFilter
    ? filteredByTitle.filter(
        (recipe) =>
          recipe.ingredients &&
          recipe.ingredients.some(
            (ing: string) => ing.toLowerCase() === ingredientFilter.toLowerCase()
          )
      )
    : filteredByTitle

  const handleRecipePress = (recipe: any) => {
    router.push(`/recipe-detail/${recipe.re_id}`)
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
          {/* Filtro por ingrediente con Menu */}
          <View style={{ marginTop: 8, zIndex: 10 }}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setMenuVisible(true)}
                  style={{ justifyContent: "center" }}
                >
                  {ingredientFilter ? ingredientFilter : "Filtrar por ingrediente"}
                </Button>
              }
            >
              <Menu.Item
                onPress={() => {
                  setIngredientFilter(null)
                  setMenuVisible(false)
                }}
                title="Todos"
              />
              <Divider />
              {allIngredients.map((ing) => (
                <Menu.Item
                  key={ing}
                  onPress={() => {
                    setIngredientFilter(ing)
                    setMenuVisible(false)
                  }}
                  title={ing}
                />
              ))}
            </Menu>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {loading && (
            <Text style={{ color: theme.colors.secondary, textAlign: "center" }}>
              Cargando...
            </Text>
          )}
          {error && (
            <Text style={{ color: "red", textAlign: "center" }}>
              Error al cargar recetas
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
                  <Text
                    variant="bodyMedium"
                    style={[styles.recipeTitle, { color: theme.colors.secondary }]}
                  >
                    {recipe.re_title}
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
