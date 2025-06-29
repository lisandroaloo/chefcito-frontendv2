import { View, StyleSheet, ScrollView, ImageBackground } from "react-native"
import { Card, IconButton, useTheme, Surface, Text } from "react-native-paper"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { createContext, useContext, useState } from "react"
import { useAuth } from '../context/AuthContext'
import React from "react"
import { Image } from 'react-native'
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors"


export default function HomeScreen() {
    const theme = useTheme()

  const categories = [
    { title: 'Sin tacc', icon: 'restaurant-outline', image: require('../../assets/sintacc.jpeg') },
    { title: 'Veganas', icon: 'leaf-outline', image: require('../../assets/vegano.jpeg') },
    { title: 'Populares', icon: 'ice-cream-outline', image: require('../../assets/popular.jpeg') },
    { title: 'Vegetarianas', icon: 'heart-outline', image: require('../../assets/vegetariano.jpeg') },
    { title: 'Hamburguesas', icon: 'fast-food-outline', image: require('../../assets/hamburguesa.jpeg') },
    { title: 'Sin lactosa', icon: 'close-circle-outline', image: require('../../assets/lactosa.jpeg') },
  ]
    const navigation = useNavigation()

  const handleCategoryPress = (category: string) => {
        navigation.navigate("recipe-list", { category });
  }



  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={styles.safeArea}>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text
            variant="headlineSmall"
            style={[styles.title, { color: theme.colors.secondary }]}
          >
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
                <ImageBackground
                  source={category.image}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Card.Content style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                      <IconButton
                        icon={category.icon}
                        size={32}
                        iconColor={theme.colors.secondary}
                        style={[styles.categoryIcon, { opacity: 0 }]}
                      />
                    </View>
                    <Text
                      variant="bodyMedium"
                      style={[styles.categoryText, { color: "black", textShadowColor: 'white', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 }]}
                    >
                      {category.title}
                    </Text>
                  </Card.Content>
                </ImageBackground>
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
      // height: "50%"
    },
    cardContent: {
      alignItems: "center",
      paddingVertical: 24,
      paddingHorizontal: 16,
      height: "100%"
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
