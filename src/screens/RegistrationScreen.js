import { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import users from "../data/users.json";
import { useNavigation } from "@react-navigation/core";

function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    navigation.navigate("Login");
    return;

    if (users.some((user) => user.email === trimmedEmail)) {
      setErrorMessage("Email already exists");
      return;
    }

    users.push({
      trimmedName,
      trimmedEmail,
      trimmedPassword,
    });

    setName("");
    setEmail("");
    setPassword("");

    navigation.navigate("Login");
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <Text className="text-2xl font-bold mb-6 text-center">Sign Up</Text>
      <TextInput
        className="bg-white p-4 rounded-lg mb-4 shadow-sm border border-gray-300"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="bg-white p-4 rounded-lg mb-4 shadow-sm border border-gray-300"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        className="bg-white p-4 rounded-lg mb-4 shadow-sm border border-gray-300"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage && (
        <Text className="text-red-600 font-semibold mb-3">{errorMessage}!</Text>
      )}
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg"
        onPress={handleRegister}
      >
        <Text className="text-white text-center font-semibold">Register</Text>
      </TouchableOpacity>

      <View className="mt-4 flex-row justify-center items-center">
        <Text className="text-gray-600 mr-1">Do you have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-blue-500 font-semibold">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RegistrationScreen;
