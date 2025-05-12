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
  ArrowUturnLeftIcon,
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  UserCircleIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/TrendingMovies";
import { useEffect, useState } from "react";
import MoviesList from "../components/MoviesList";
import { useNavigation } from "@react-navigation/core";
import LoadingScreen from "./LoadingScreen";
import { useAuth } from "../contexts/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/moviesdb";

const ios = Platform.OS === "ios";

function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const { currentUser } = useAuth();
  const navigation = useNavigation();

  useEffect(function () {
    getMovies();
  }, []);

  async function getMovies() {
    try {
      const trendingMovies = await fetchTrendingMovies();
      setTrending(trendingMovies.results || []);
      const upcomingMovies = await fetchUpcomingMovies();
      setUpcoming(upcomingMovies.results || []);
      const topRatedMovies = await fetchTopRatedMovies();
      setTopRated(topRatedMovies.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

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

  // return (
  //   <View className="flex-row justify-between items-center p-4 bg-blue-500">
  //     <Text className="text-white text-lg font-bold">My App</Text>

  //   </View>
  // );

  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          {/* <TouchableOpacity onPress={logout}> */}
          {/* <Bars3CenterLeftIcon color="white" size={30} strokeWidth={2} /> */}
          {/* <View className="flex-"> */}
          {/* <UserCircleIcon color="white" size={30} strokeWidth={2} /> */}
          <View className="relative">
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
              <Bars3CenterLeftIcon color="white" size={30} strokeWidth={2} />
            </TouchableOpacity>

            {/* Dropdown Menu */}
            {isOpen && (
              <View className="absolute top-full mt-2 p-2 bg-white shadow-md rounded-lg w-56 z-50">
                <TouchableOpacity
                  className="py-2 px-4 border-b border-gray-200 flex flex-row  items-center"
                  onPress={logout}
                >
                  <ArrowUturnLeftIcon color={"black"} />
                  <Text className="text-black ml-3">Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="py-2 px-4 border-b border-gray-200 flex flex-row  items-center"
                  onPress={() => {
                    navigation.navigate("FavoriteMovies");
                    setIsOpen(false);
                  }}
                >
                  <PlayIcon color={"black"} />
                  <Text className="text-black ml-3">Favorite Movies</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="py-2 px-4 flex flex-row  items-center"
                  onPress={() => {
                    navigation.navigate("FavoriteActors");
                    setIsOpen(false);
                  }}
                >
                  <UserIcon color={"black"} />
                  <Text className="text-black ml-3">Favorite Actors</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {/* </View> */}
          {/* </TouchableOpacity> */}
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
          <MoviesList title={"Upcoming"} data={upcoming} />
          <MoviesList title={"Top Rated"} data={topRated} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default HomeScreen;
