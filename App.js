import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextComponent, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import AppNavigation from "./src/navigation/AppNavigation";
import "./global.css";

export default function App() {
  Text.defaultProps = Text.defaultProps  || {};
  Text.defaultProps = Text.defaultProps.style = {
    fontFamily: 'Rosemary'
  }
  return <AppNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
