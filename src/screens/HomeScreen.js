import { StatusBar } from "expo-status-bar";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/TrendingMovies";
import { useState } from "react";
import MoviesList from "../components/MoviesList";
import { useNavigation } from "@react-navigation/core";
import LoadingScreen from "./LoadingScreen";
import { useAuth } from "../contexts/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const ios = Platform.OS === "ios";

function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const navigation = useNavigation();

  if (loading) {
    return <LoadingScreen />;
  }

  async function logout() {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity onPress={logout}>
            {/* <Bars3CenterLeftIcon color="white" size={30} strokeWidth={2} /> */}
            <View className="flex-row items-center">
              <UserCircleIcon color="white" size={30} strokeWidth={2} /> |{" "}
              <Text className="text-white font-semibold ml-3 text-center">
                {currentUser.displayName}
              </Text>
            </View>
          </TouchableOpacity>
          <Text className="text-white text-3xl font-bold">
            <Text className="text-cyan-500">M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon color="white" size={30} strokeWidth={2} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={}
        >
          {/* Trending Movies  */}
          <TrendingMovies movies={trending} />
          {/* <View className="flex justify-center items-center">
            <View className="w-20 h-20 bg-slate-400"></View>
            <View className="w-20 h-20 bg-slate-400"></View>
            <View className="w-20 h-20 bg-slate-400"></View>
            <View className="w-20 h-20 bg-slate-400"></View>
            <View className="w-20 h-20 bg-slate-400"></View>
            <View className="w-20 h-20 bg-slate-400"></View>
            <View className="w-20 h-20 bg-slate-400"></View>
            <View className="w-20 h-20 bg-slate-400"></View>
          </View> */}
          <MoviesList title={"Upcoming"} data={trending} />
          <MoviesList title={"Top Rated"} data={trending} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default HomeScreen;
