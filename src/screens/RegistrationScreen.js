import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase-config";
import LoadingScreen from "./LoadingScreen";

function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  async function handleRegister() {
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCreds.user, {
        displayName: name,
      });

      setName("");
      setEmail("");
      setPassword("");
      setErrorMessage("");

      navigation.navigate("Login");
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingScreen />;

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
