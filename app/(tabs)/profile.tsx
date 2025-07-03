"use client"

import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Card, Text, IconButton, Button, useTheme, Surface, Avatar, Dialog, Portal } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../context/AuthContext"
import React from "react"
import { useRouter } from "expo-router"
import { useRecipeDetail } from "../hooks/useRecipeDetail"
import { TouchableOpacity } from "react-native"




export default function ProfileScreen() {
  const [userRecipes, setUserRecipes] = useState<any[]>([])
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
  const [recipeToDelete, setRecipeToDelete] = useState<number | null>(null)
  const theme = useTheme()
  const router = useRouter()

  const { user, logout } = useAuth()

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const res = await fetch("https://chefcito-backtend-production.up.railway.app/api/pending-recipe-x-user/user/1")
        const pendientes = await res.json()

        const detalles: any[] = await Promise.all(
          pendientes.map(async (item: any) => {
            const detalleRes = await fetch(`https://chefcito-backtend-production.up.railway.app/api/recipe/${item.rxu_re_id}`)
            const receta = await detalleRes.json()
            return {
              ...receta,
              rxu_id: item.rxu_id // 👈 Agregamos el ID del favorito
            }
          })
        )


        setUserRecipes(detalles)
      } catch (error) {
        console.error("Error al obtener recetas del usuario", error)
      }
    }

    fetchUserRecipes()
  }, [])

  const handleDeleteRecipe = (index: number) => {
    const recipe = userRecipes[index]
    setRecipeToDelete(recipe.rxu_id)
    setDeleteDialogVisible(true)
  }

  const confirmDelete = async () => {
    if (recipeToDelete !== null) {
      try {
        await fetch(`https://chefcito-backtend-production.up.railway.app/api/pending-recipe-x-user/${recipeToDelete}`, {
          method: "DELETE",
        })

        const newRecipes = userRecipes.filter((r) => r.rxu_id !== recipeToDelete)
        setUserRecipes(newRecipes)
      } catch (err) {
        console.error("Error al eliminar receta", err)
      }
    }

    setDeleteDialogVisible(false)
    setRecipeToDelete(null)
  }


  const handleCreateRecipe = () => {
    router.replace("/create-recipe")
  }

  const handleEditRecipe = () => {
    router.replace("/edit-recipe")
  }

  const handleLogout = () => {
    logout()
    router.replace("/")
  }

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Avatar.Image
              size={120}
              source={{ uri: 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=👨‍🍳' }}
              style={styles.avatar}
            />
            <Text
              variant="headlineMedium"
              style={[styles.username, { color: '#FFFFFF' }]}
            >
              {user}
            </Text>
            <Text
              variant="bodyLarge"
              style={[styles.subtitle, { color: 'rgba(255, 255, 255, 0.8)' }]}
            >
              Nuestros recetarios
            </Text>
          </View>

          {/* Recipes List */}
          <View style={styles.recipesSection}>
            {userRecipes.map((recipe, index) => (
              <Card
                key={recipe.re_id}
                style={styles.recipeCard}
                mode="elevated"
                elevation={1}
              >
                <Card.Content style={styles.recipeCardContent}>
                  <View style={styles.recipeInfo}>

                    <TouchableOpacity onPress={() => router.replace(`/recipe-detail/${recipe.re_id}`)}>
                      <Text
                        variant="bodyMedium"
                        style={[styles.recipeName, { color: theme.colors.secondary }]}
                      >
                        {recipe.re_title}
                      </Text>
                    </TouchableOpacity>

                  </View>
                  <IconButton
                    icon="close"
                    size={20}
                    iconColor="#FF5252"
                    onPress={() => handleDeleteRecipe(index)}
                    style={styles.deleteButton}
                  />
                </Card.Content>
              </Card>
            ))}

          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsSection}>
            <Button
              mode="contained"
              onPress={handleCreateRecipe}
              style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Crear receta
            </Button>

            <Button
              mode="contained"
              onPress={handleEditRecipe}
              style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Editar receta
            </Button>

            <Button
              mode="contained"
              onPress={handleLogout}
              style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Log out
            </Button>
          </View>
        </ScrollView>

        <Portal>
          <Dialog
            visible={deleteDialogVisible}
            onDismiss={() => setDeleteDialogVisible(false)}
          >
            <Dialog.Title>Eliminar receta</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">¿Estás seguro de que quieres eliminar esta receta?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDeleteDialogVisible(false)}>Cancelar</Button>
              <Button onPress={confirmDelete}>Eliminar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
  profileSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    marginBottom: 16,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  recipesSection: {
    marginBottom: 32,
    gap: 12,
  },
  recipeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  recipeCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  recipeInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  recipeIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  recipeIcon: {
    margin: 0,
  },
  recipeName: {
    fontWeight: "600",
    fontSize: 16,
  },
  deleteButton: {
    margin: 0,
  },
  buttonsSection: {
    gap: 16,
  },
  actionButton: {
    borderRadius: 24,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
})
