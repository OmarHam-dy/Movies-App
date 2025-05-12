import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useAuth } from "../contexts/AuthProvider";
import LoadingScreen from "./LoadingScreen";

const LoginScreen = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function handleLogin() {
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const userCreds = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCreds.user);

      setEmail("");
      setPassword("");
      setErrorMessage("");

      navigation.navigate("Home");
    } catch (err) {
      setErrorMessage("Invalid email or password");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingScreen />;
  return (
    <View className="flex-1 bg-neutral-900 justify-center items-center px-6">
      <Text className="text-2xl font-bold text-white mb-6">Welcome Back</Text>
      <View className="w-full">
        <TextInput
          className="bg-neutral-800 text-white p-4 rounded-lg mb-4 shadow-sm border border-gray-700"
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="bg-neutral-800 text-white p-4 rounded-lg mb-6 shadow-sm border border-gray-700"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errorMessage && (
          <Text className="text-red-500 font-semibold mb-3">
            {errorMessage}!
          </Text>
        )}
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-semibold">Login</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-4 flex-row justify-center items-center">
        <Text className="text-gray-400 mr-1">Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
          <Text className="text-blue-400 font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
