import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams } from "expo-router"

export default function RecipeDetailScreen() {
  const { recipe } = useLocalSearchParams()

  const ingredients = [
    "500g carne molida",
    "1 cebolla picada",
    "2 dientes de ajo",
    "1 huevo",
    "Pan rallado",
    "Sal y pimienta",
  ]

  const steps = [
    "Mezclar la carne con cebolla y ajo",
    "Agregar huevo y pan rallado",
    "Formar las albóndigas",
    "Cocinar en sartén con aceite",
    "Servir caliente",
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: "https://via.placeholder.com/400x200/FF9500/FFFFFF?text=Albondigas" }}
          style={styles.recipeImage}
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Albóndigas</Text>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="#8B4513" />
            </TouchableOpacity>
          </View>

          <View style={styles.rating}>
            {[1, 2, 3].map((star) => (
              <Ionicons key={star} name="star" size={20} color="#FFD700" />
            ))}
            {[4, 5].map((star) => (
              <Ionicons key={star} name="star-outline" size={20} color="#FFD700" />
            ))}
          </View>

          <Text style={styles.description}>Deliciosas albóndigas caseras perfectas para cualquier ocasión.</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            <View style={styles.ingredientsList}>
              {ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={styles.ingredientText}>• {ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preparación</Text>
            <View style={styles.stepsList}>
              {steps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <Text style={styles.stepNumber}>{index + 1}.</Text>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
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
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  rating: {
    flexDirection: "row",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  ingredientsList: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
  ingredientItem: {
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 14,
    color: "#333",
  },
  stepsList: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8B4513",
    marginRight: 10,
    minWidth: 20,
  },
  stepText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
})
