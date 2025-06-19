"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import { useRoute } from "@react-navigation/native";


export default function RecipeListScreen() {
  const [searchText, setSearchText] = useState("")
  const route = useRoute();
  const { category } = route.params || {};

  const recipes = ["Receta 1", "Receta 2", "Receta 3", "Receta 4", "Receta 5", "Receta 6", "Receta 7", "Receta 8"]

  const handleRecipePress = (recipe: string) => {
        navigation.navigate("recipe-detail", { recipe });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar recetas"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {recipes.map((recipe, index) => (
            <TouchableOpacity key={index} style={styles.recipeCard} onPress={() => handleRecipePress(recipe)}>
              <View style={styles.recipeImagePlaceholder}>
                <Ionicons name="restaurant-outline" size={40} color="#8B4513" />
              </View>
              <Text style={styles.recipeTitle}>{recipe}</Text>
            </TouchableOpacity>
          ))}
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
  searchContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  recipeCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    width: "48%",
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recipeImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8B4513",
    textAlign: "center",
  },
})
