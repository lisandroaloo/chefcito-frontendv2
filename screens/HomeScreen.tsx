import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function HomeScreen({ navigation }: any) {
  const categories = [
    { title: "Recetas sin taco", icon: "restaurant-outline" },
    { title: "Recetas veganas", icon: "leaf-outline" },
    { title: "Postres", icon: "ice-cream-outline" },
    { title: "Nos apoyaron", icon: "heart-outline" },
    { title: "Hamburguesas", icon: "fast-food-outline" },
    { title: "Sin", icon: "close-circle-outline" },
  ]

  const handleCategoryPress = (category: string) => {
    navigation.navigate("RecipeList", { category })
  }

  const handleProfilePress = () => {
    navigation.navigate("Profile")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Ionicons name="person-circle-outline" size={30} color="#8B4513" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Funcionalidades de la app</Text>

        <View style={styles.grid}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category.title)}
            >
              <Ionicons name={category.icon as any} size={40} color="#8B4513" style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{category.title}</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8B4513",
    textAlign: "center",
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
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
  categoryIcon: {
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8B4513",
    textAlign: "center",
  },
})
