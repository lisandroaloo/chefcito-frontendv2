import { View, StyleSheet, ScrollView } from "react-native"
import { Card, IconButton, useTheme, Surface, Text } from "react-native-paper"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../context/AuthContext"


export default function HomeScreen() {
    const theme = useTheme()

    const { user } = useContext(AuthContext)

  const categories = [
    { title: "Recetas sin tac", icon: "restaurant-outline" },
    { title: "Recetas veganas", icon: "leaf-outline" },
    { title: "Postres", icon: "ice-cream-outline" },
    { title: "Nos apoyaron", icon: "heart-outline" },
    { title: "Hamburguesas", icon: "fast-food-outline" },
    { title: "Sin", icon: "close-circle-outline" },
  ]
    const navigation = useNavigation()

  const handleCategoryPress = (category: string) => {
        navigation.navigate("recipe-list", { category });
  }

  const handleProfilePress = () => {
    if (user) {
      navigation.navigate("profile")
    } else {
      navigation.navigate("login")
    }
  }


  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <SafeAreaView style={styles.safeArea}>
          {/* Header with profile icon */}
          <View style={styles.header}>
            <IconButton
              icon="account-circle"
              size={28}
              iconColor={theme.colors.secondary}
              onPress={handleProfilePress}
              style={styles.profileButton}
            />
          </View>

          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* Title */}
            <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.secondary }]}>
              Funcionalidades de la app
            </Text>

            {/* Categories Grid - Exact Material 3 Cards */}
            <View style={styles.grid}>
              {categories.map((category, index) => (
                <Card
                  key={index}
                  style={styles.categoryCard}
                  mode="elevated"
                  onPress={() => handleCategoryPress(category.title)}
                  elevation={2}
                >
                  <Card.Content style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                      <IconButton
                        icon={category.icon}
                        size={32}
                        iconColor={theme.colors.secondary}
                        style={styles.categoryIcon}
                      />
                    </View>
                    <Text variant="bodyMedium" style={[styles.categoryText, { color: theme.colors.secondary }]}>
                      {category.title}
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
    header: {
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    profileButton: {
      margin: 0,
    },
    content: {
      padding: 20,
      paddingTop: 0,
    },
    title: {
      textAlign: "center",
      marginBottom: 32,
      fontWeight: "600",
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 16,
    },
    categoryCard: {
      width: "47%",
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
    },
    cardContent: {
      alignItems: "center",
      paddingVertical: 24,
      paddingHorizontal: 16,
    },
    iconContainer: {
      marginBottom: 8,
    },
    categoryIcon: {
      margin: 0,
    },
    categoryText: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 14,
      lineHeight: 20,
    },
  })
