'use client'

import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import { Card, IconButton, useTheme, Surface, Text, Searchbar, Menu, Button, Checkbox } from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRecipes } from '../hooks/useRecipes'
import { useRouter } from 'expo-router'

export default function RecipeListScreen() {
  const theme = useTheme()
  const route = useRoute()
  const router = useRouter()
  const { category } = route.params || {}
  const { recipes, loading, error } = useRecipes(category)

  const [searchQuery, setSearchQuery] = useState('')
  const [includeMenuVisible, setIncludeMenuVisible] = useState(false)
  const [excludeMenuVisible, setExcludeMenuVisible] = useState(false)
  const [includeIngredients, setIncludeIngredients] = useState<Set<string>>(new Set())
  const [excludeIngredients, setExcludeIngredients] = useState<Set<string>>(new Set())

  // Hardcode por ahora
  const allIngredients = recipes.map((recipe) => (recipe.ingredients || []).map((ing: string) => ing.toLowerCase())).flat()

  // Filtro por título
  const filteredByTitle = recipes.filter((recipe) => {
    if (!recipe.re_title) return false
    const words = recipe.re_title.toLowerCase().split(' ')
    return words.some((word: string) => word.startsWith(searchQuery.toLowerCase()))
  })

  // Filtro por inclusión y exclusión de ingredientes
  const filteredRecipes = filteredByTitle.filter((recipe) => {
    const recipeIngs = (recipe.ingredients || []).map((ing: string) => ing.toLowerCase())
    const includesOK = Array.from(includeIngredients).every((ing) => recipeIngs.includes(ing))
    const excludesOK = Array.from(excludeIngredients).every((ing) => !recipeIngs.includes(ing))
    return includesOK && excludesOK
  })

  const toggleIngredient = (ing: string, include: boolean) => {
    if (include) {
      const newSet = new Set(includeIngredients)
      newSet.has(ing) ? newSet.delete(ing) : newSet.add(ing)
      setIncludeIngredients(newSet)
    } else {
      const newSet = new Set(excludeIngredients)
      newSet.has(ing) ? newSet.delete(ing) : newSet.add(ing)
      setExcludeIngredients(newSet)
    }
  }

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

          {/* Filtros de ingredientes */}
          <View style={{ marginTop: 8, gap: 12 }}>
            <Text
              variant="titleSmall"
              style={{ color: '#fff', marginBottom: 4 }}
            >
              Incluir ingredientes
            </Text>
            <View style={{ backgroundColor: '#fff', borderRadius: 8 }}>
              <Menu
                visible={includeMenuVisible}
                onDismiss={() => setIncludeMenuVisible(false)}
                anchor={
                  <Button
                    mode="text"
                    onPress={() => setIncludeMenuVisible(true)}
                    contentStyle={{ justifyContent: 'flex-start' }}
                    labelStyle={{ color: theme.colors.primary }}
                  >
                    {includeIngredients.size > 0 ? `Incluir: ${Array.from(includeIngredients).join(', ')}` : 'Seleccionar ingredientes'}
                  </Button>
                }
              >
                {allIngredients.map((ing) => (
                  <Menu.Item
                    key={ing}
                    onPress={() => toggleIngredient(ing, true)}
                    title={
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox status={includeIngredients.has(ing) ? 'checked' : 'unchecked'} />
                        <Text>{ing}</Text>
                      </View>
                    }
                  />
                ))}
              </Menu>
            </View>

            <Text
              variant="titleSmall"
              style={{ color: '#fff', marginBottom: 4 }}
            >
              Excluir ingredientes
            </Text>
            <View style={{ backgroundColor: '#fff', borderRadius: 8 }}>
              <Menu
                visible={excludeMenuVisible}
                onDismiss={() => setExcludeMenuVisible(false)}
                anchor={
                  <Button
                    mode="text"
                    onPress={() => setExcludeMenuVisible(true)}
                    contentStyle={{ justifyContent: 'flex-start' }}
                    labelStyle={{ color: theme.colors.primary }}
                  >
                    {excludeIngredients.size > 0 ? `Excluir: ${Array.from(excludeIngredients).join(', ')}` : 'Seleccionar ingredientes a excluir'}
                  </Button>
                }
              >
                {allIngredients.map((ing) => (
                  <Menu.Item
                    key={ing}
                    onPress={() => toggleIngredient(ing, false)}
                    title={
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox status={excludeIngredients.has(ing) ? 'checked' : 'unchecked'} />
                        <Text>{ing}</Text>
                      </View>
                    }
                  />
                ))}
              </Menu>
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {loading && <Text style={{ color: theme.colors.secondary, textAlign: 'center' }}>Cargando...</Text>}
          {error && <Text style={{ color: 'red', textAlign: 'center' }}>Error al cargar recetas</Text>}

          <View style={styles.grid}>
            {filteredRecipes.map((recipe: any, index: number) => (
              <Card
                key={index}
                style={styles.recipeCard}
                onPress={() => handleRecipePress(recipe)}
                mode="elevated"
              >
                <Card.Content style={styles.cardContent}>
                  <ImageBackground
                    source={{ uri: recipe.re_picture }}
                    style={styles.recipeImagePlaceholder}
                    imageStyle={{ borderRadius: 30 }}
                  >
                 
                  </ImageBackground>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recipeCard: {
    width: '48%',
    marginBottom: 16,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  recipeImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden', // importante para que el borde redondeado funcione en Android
  },
  iconOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 30,
  },
  recipeIcon: {
    margin: 0,
  },
  recipeTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
