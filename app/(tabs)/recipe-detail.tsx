
import { View, StyleSheet, ScrollView, Image } from "react-native"
import { Card, Text, IconButton, useTheme, Surface } from "react-native-paper"
import { useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute } from "@react-navigation/native";


export default function RecipeDetailScreen() {
  const route = useRoute();
  const { recipe } = route.params || {};
  const theme = useTheme()


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
     <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
       <SafeAreaView style={styles.safeArea}>
         <ScrollView showsVerticalScrollIndicator={false}>
           {/* Recipe Image */}
           <Image
             source={{ uri: "https://via.placeholder.com/400x200/FF9500/FFFFFF?text=Albondigas" }}
             style={styles.recipeImage}
           />

           <View style={styles.content}>
             {/* Header with title and favorite */}
             <View style={styles.header}>
               <Text variant="headlineMedium" style={[styles.title, { color: "#FFFFFF" }]}>
                 Albóndigas
               </Text>
               <IconButton icon="heart-outline" size={24} iconColor="#FFFFFF" onPress={() => {}} />
             </View>

             {/* Rating */}
             <View style={styles.rating}>
               {[1, 2, 3].map((star) => (
                 <IconButton key={star} icon="star" size={20} iconColor="#FFD700" style={styles.star} />
               ))}
               {[4, 5].map((star) => (
                 <IconButton key={star} icon="star-outline" size={20} iconColor="#FFD700" style={styles.star} />
               ))}
             </View>

             {/* Description */}
             <Text variant="bodyLarge" style={[styles.description, { color: "#FFFFFF" }]}>
               Deliciosas albóndigas caseras perfectas para cualquier ocasión.
             </Text>

             {/* Ingredients Section */}
             <Card style={styles.section} mode="elevated" elevation={2}>
               <Card.Content style={styles.sectionContent}>
                 <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.secondary }]}>
                   Ingredientes
                 </Text>
                 <View style={styles.ingredientsList}>
                   {ingredients.map((ingredient, index) => (
                     <View key={index} style={styles.ingredientItem}>
                       <Text variant="bodyMedium" style={styles.ingredientText}>
                         • {ingredient}
                       </Text>
                     </View>
                   ))}
                 </View>
               </Card.Content>
             </Card>

             {/* Steps Section */}
             <Card style={styles.section} mode="elevated" elevation={2}>
               <Card.Content style={styles.sectionContent}>
                 <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.secondary }]}>
                   Paso a paso
                 </Text>
                 <View style={styles.stepsList}>
                   {steps.map((step, index) => (
                     <View key={index} style={styles.stepItem}>
                       <View style={styles.stepNumberContainer}>
                         <Text variant="bodyMedium" style={[styles.stepNumber, { color: theme.colors.secondary }]}>
                           {index + 1}
                         </Text>
                       </View>
                       <Text variant="bodyMedium" style={styles.stepText}>
                         {step}
                       </Text>
                     </View>
                   ))}
                 </View>
               </Card.Content>
             </Card>
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
     marginBottom: 8,
   },
   title: {
     fontWeight: "bold",
   },
   rating: {
     flexDirection: "row",
     marginBottom: 16,
     marginLeft: -8,
   },
   star: {
     margin: 0,
   },
   description: {
     marginBottom: 24,
     lineHeight: 24,
   },
   section: {
     marginBottom: 16,
     backgroundColor: "#FFFFFF",
     borderRadius: 12,
   },
   sectionContent: {
     padding: 20,
   },
   sectionTitle: {
     fontWeight: "bold",
     marginBottom: 16,
   },
   ingredientsList: {
     gap: 8,
   },
   ingredientItem: {
     paddingVertical: 2,
   },
   ingredientText: {
     fontSize: 14,
     lineHeight: 20,
   },
   stepsList: {
     gap: 12,
   },
   stepItem: {
     flexDirection: "row",
     alignItems: "flex-start",
   },
   stepNumberContainer: {
     width: 24,
     height: 24,
     borderRadius: 12,
     backgroundColor: "#F5F5F5",
     justifyContent: "center",
     alignItems: "center",
     marginRight: 12,
     marginTop: 2,
   },
   stepNumber: {
     fontSize: 12,
     fontWeight: "bold",
   },
   stepText: {
     flex: 1,
     fontSize: 14,
     lineHeight: 20,
   },
 })
