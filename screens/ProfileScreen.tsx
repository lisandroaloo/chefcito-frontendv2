"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function ProfileScreen({ navigation }: any) {
  const [userRecipes, setUserRecipes] = useState(["Receta 1", "Receta 2", "Receta 3"])

  const handleDeleteRecipe = (index: number) => {
    Alert.alert("Eliminar receta", "¿Estás seguro de que quieres eliminar esta receta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          const newRecipes = userRecipes.filter((_, i) => i !== index)
          setUserRecipes(newRecipes)
        },
      },
    ])
  }

  const handleCreateRecipe = () => {
    navigation.navigate("CreateRecipe")
  }

  const handleEditRecipe = () => {
    navigation.navigate("CreateRecipe")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={60} color="#8B4513" />
          </View>
          <Text style={styles.username}>Alias</Text>
          <Text style={styles.subtitle}>Nuestros recetarios</Text>
        </View>

        <View style={styles.recipesSection}>
          {userRecipes.map((recipe, index) => (
            <View key={index} style={styles.recipeItem}>
              <View style={styles.recipeInfo}>
                <View style={styles.recipeIcon}>
                  <Ionicons name="restaurant-outline" size={20} color="#8B4513" />
                </View>
                <Text style={styles.recipeName}>{recipe}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteRecipe(index)} style={styles.deleteButton}>
                <Ionicons name="close" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.buttonsSection}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCreateRecipe}>
            <Text style={styles.actionButtonText}>Crear receta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleEditRecipe}>
            <Text style={styles.actionButtonText}>Editar receta</Text>
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
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  recipesSection: {
    marginBottom: 30,
  },
  recipeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  recipeInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  recipeIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFE4B5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  recipeName: {
    fontSize: 16,
    color: "#8B4513",
    fontWeight: "500",
  },
  deleteButton: {
    padding: 5,
  },
  buttonsSection: {
    gap: 15,
  },
  actionButton: {
    backgroundColor: "#8B4513",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})
