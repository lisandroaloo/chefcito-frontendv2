"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Card, Text, IconButton, Button, useTheme, Surface, Avatar, Dialog, Portal } from "react-native-paper"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"

export default function ProfileScreen() {
 const [userRecipes, setUserRecipes] = useState(["Receta 1", "Receta 2", "Receta 3"])
   const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
   const [recipeToDelete, setRecipeToDelete] = useState<number | null>(null)
   const theme = useTheme()

   const handleDeleteRecipe = (index: number) => {
     setRecipeToDelete(index)
     setDeleteDialogVisible(true)
   }

   const confirmDelete = () => {
     if (recipeToDelete !== null) {
       const newRecipes = userRecipes.filter((_, i) => i !== recipeToDelete)
       setUserRecipes(newRecipes)
     }
     setDeleteDialogVisible(false)
     setRecipeToDelete(null)
   }

  const handleCreateRecipe = () => {
    navigation.navigate("create-recipe")
  }

  const handleEditRecipe = () => {
    navigation.navigate("create-recipe")
  }

  return (
     <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
       <SafeAreaView style={styles.safeArea}>
         <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
           {/* Profile Section */}
           <View style={styles.profileSection}>
             <Avatar.Image
               size={120}
               source={{ uri: "https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=👨‍🍳" }}
               style={styles.avatar}
             />
             <Text variant="headlineMedium" style={[styles.username, { color: "#FFFFFF" }]}>
               Alias
             </Text>
             <Text variant="bodyLarge" style={[styles.subtitle, { color: "rgba(255, 255, 255, 0.8)" }]}>
               Nuestros recetarios
             </Text>
           </View>

           {/* Recipes List */}
           <View style={styles.recipesSection}>
             {userRecipes.map((recipe, index) => (
               <Card key={index} style={styles.recipeCard} mode="elevated" elevation={1}>
                 <Card.Content style={styles.recipeCardContent}>
                   <View style={styles.recipeInfo}>
                     <View style={styles.recipeIconContainer}>
                       <IconButton
                         icon="silverware-fork-knife"
                         size={20}
                         iconColor={theme.colors.secondary}
                         style={styles.recipeIcon}
                       />
                     </View>
                     <Text variant="bodyMedium" style={[styles.recipeName, { color: theme.colors.secondary }]}>
                       {recipe}
                     </Text>
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
           </View>
         </ScrollView>

         <Portal>
           <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)}>
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
