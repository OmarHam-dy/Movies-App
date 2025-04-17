import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import users from "../data/users.json";

const LoginScreen = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const user = users.find((user) => user.email === email);

    navigation.navigate("Home");
    return;

    if (!user) {
      setErrorMessage("User not found, chek your email and password");
      return;
    }

    if (user.password !== password) {
      setErrorMessage("Incorrect password");
      return;
    }

    setEmail("");
    setPassword("");

    navigation.navigate("Home");
  };

  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Welcome Back
      </Text>
      <View className="w-full">
        <TextInput
          className="bg-white p-4 rounded-lg mb-4 shadow-sm border border-gray-300"
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="bg-white p-4 rounded-lg mb-6 shadow-sm border border-gray-300"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errorMessage && (
          <Text className="text-red-600 font-semibold mb-3">
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
      <View className=" mt-4 flex-row justify-center items-center">
        <Text className="text-gray-600 mr-1"> Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Registration")}
          className=""
        >
          <Text className="text-blue-500 font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
