import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import LoadingScreen from "./LoadingScreen";
import { addDoc, collection } from "firebase/firestore";

function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const usersCollectionRef = collection(db, "users");

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

      await addDoc(usersCollectionRef, {
        email: email,
        favoriteMovies: [],
        favoriteActors: [],
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
    <View className="flex-1 justify-center px-4 bg-neutral-900">
      <Text className="text-2xl font-bold mb-6 text-center text-white">
        Sign Up
      </Text>
      <TextInput
        className="bg-neutral-800 text-white p-4 rounded-lg mb-4 shadow-sm border border-gray-600"
        placeholder="Name"
        placeholderTextColor="#A3A3A3"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="bg-neutral-800 text-white p-4 rounded-lg mb-4 shadow-sm border border-gray-600"
        placeholder="Email"
        placeholderTextColor="#A3A3A3"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        className="bg-neutral-800 text-white p-4 rounded-lg mb-4 shadow-sm border border-gray-600"
        placeholder="Password"
        placeholderTextColor="#A3A3A3"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage && (
        <Text className="text-red-400 font-semibold mb-3">{errorMessage}!</Text>
      )}
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg"
        onPress={handleRegister}
      >
        <Text className="text-white text-center font-semibold">Register</Text>
      </TouchableOpacity>

      <View className="mt-4 flex-row justify-center items-center">
        <Text className="text-gray-400 mr-1">Do you have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-blue-400 font-semibold">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RegistrationScreen;
