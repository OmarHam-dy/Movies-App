import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchTrendingMovies, image500 } from "../api/moviesdb";
import { useNavigation } from "@react-navigation/core";
import { TrashIcon, XCircleIcon } from "react-native-heroicons/outline";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { set } from "lodash";
import { useAuth } from "../contexts/AuthProvider";
import LoadingScreen from "./LoadingScreen";
import { fullbackMoviePosterImage } from "../utils/constants";

const window = Dimensions.get("window");

function FavoriteMoviesScreen() {
  const usersCollectionRef = collection(db, "users");
  const { currentUser } = useAuth();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(function () {
    getMovies();
  }, []);

  async function getMovies() {
    try {
      setLoading(true);
      const data = await getDocs(usersCollectionRef);
      const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const user = users.find((user) => user.email === currentUser.email);
      setFavoriteMovies(user.favoriteMovies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteMovie(id) {
    try {
      setLoading(true);
      const data = await getDocs(usersCollectionRef);
      const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const user = users.find((user) => user.email === currentUser.email);
      const userDoc = doc(db, "users", user.id);
      const updatedFavoriteMovies = user.favoriteMovies.filter(
        (mov) => mov.id !== id
      );
      await updateDoc(userDoc, { favoriteMovies: updatedFavoriteMovies });
      setFavoriteMovies(updatedFavoriteMovies);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingScreen />;

  return (
    <SafeAreaView className="bg-neutral-900 flex-1 pt-5">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-white text-xl pl-2">Favorite Movies</Text>
        <TouchableOpacity
          className="rounded-xl "
          onPress={() => navigation.goBack()}
        >
          <XCircleIcon size="50" strokeWidth={1} color="white" />
        </TouchableOpacity>
      </View>
      <View className="h-[0.7] w-full bg-white mt-3 mb-5"></View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="space-y-3"
      >
        {favoriteMovies.length === 0 ? (
          <Text className="text-gray-400 text-xl text-center">
            Not there movies yet...
          </Text>
        ) : (
          <View className="flex-row justify-between flex-wrap">
            {favoriteMovies.map((movie) => {
              return (
                <View key={movie.id}>
                  <View className="space-y-2 mb-4">
                    <View className="flex items-center">
                      <TouchableOpacity onPress={() => deleteMovie(movie.id)}>
                        <TrashIcon color={"white"} size={30} />
                      </TouchableOpacity>
                    </View>
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate("Movie", movie)}
                    >
                      <View>
                        <Image
                          // source={require("../../assets/images/poster2.webp")}
                          source={{
                            uri:
                              image500(movie.poster_path) ||
                              fullbackMoviePosterImage,
                          }}
                          className="rounded-3xl mt-3"
                          style={{
                            width: window.width * 0.44,
                            height: window.height * 0.3,
                          }}
                        />
                        <Text className="text-neutral-300 ml-1">
                          {movie.title.length > 15
                            ? movie.title.slice(0, 15) + "..."
                            : movie.title}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FavoriteMoviesScreen;
