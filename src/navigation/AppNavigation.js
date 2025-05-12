import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import FavoriteMoviesScreen from "../screens/FavoriteMoviesScreen";
import FavoriteActorsScreen from "../screens/FavoriteActorsScreen";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={RegistrationScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Movie"
          options={{ headerShown: false }}
          component={MovieScreen}
        />
        <Stack.Screen
          name="Person"
          options={{ headerShown: false }}
          component={PersonScreen}
        />
        <Stack.Screen
          name="Search"
          options={{ headerShown: false }}
          component={SearchScreen}
        />
        <Stack.Screen
          name="FavoriteMovies"
          options={{ headerShown: false }}
          component={FavoriteMoviesScreen}
        />
        <Stack.Screen
          name="FavoriteActors"
          options={{ headerShown: false }}
          component={FavoriteActorsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
