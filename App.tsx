import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import "react-native-gesture-handler"

// Import screens
import LoginScreen from "./screens/LoginScreen"
import CodeVerificationScreen from "./screens/CodeVerificationScreen"
import PasswordResetScreen from "./screens/PasswordResetScreen"
import HomeScreen from "./screens/HomeScreen"
import RecipeDetailScreen from "./screens/RecipeDetailScreen"
import RecipeListScreen from "./screens/RecipeListScreen"
import CreateRecipeScreen from "./screens/CreateRecipeScreen"
import ProfileScreen from "./screens/ProfileScreen"

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FF9500",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CodeVerification" component={CodeVerificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Chefcito" }} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: "Chefcito" }} />
        <Stack.Screen name="RecipeList" component={RecipeListScreen} options={{ title: "Chefcito" }} />
        <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} options={{ title: "Chefcito" }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Chefcito" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
