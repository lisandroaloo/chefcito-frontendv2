"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { Card, Title, IconButton, useTheme, Surface, Text, Searchbar } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context"



export default function RecipeListScreen() {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const route = useRoute();
  const { category } = route.params || {};

  const recipes = ["Receta 1", "Receta 2", "Receta 3", "Receta 4", "Receta 5", "Receta 6", "Receta 7", "Receta 8"]

  const handleRecipePress = (recipe: string) => {
        navigation.navigate("recipe-detail", { recipe });
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
            <View style={styles.grid}>
              {recipes.map((recipe, index) => (
                <Card key={index} style={styles.recipeCard} onPress={() => handleRecipePress(recipe)} mode="elevated">
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
                      {recipe}
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
