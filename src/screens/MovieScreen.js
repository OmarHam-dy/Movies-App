import { useNavigation, useRoute } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import Cast from "../components/Cast";
import MoviesList from "../components/MoviesList";
import LoadingScreen from "./LoadingScreen";
import { fullbackMoviePosterImage, IMAGES_BASE_URL } from "../utils/constants";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  imageOriginal,
} from "../api/moviesdb";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { useAuth } from "../contexts/AuthProvider";
import { set } from "lodash";

const movieName = "In the Lost Lands";
const window = Dimensions.get("window");
const ios = Platform.OS === "ios";
const MarginTop = ios ? 0 : "mt-10";

function MovieScreen() {
  const usersCollectionRef = collection(db, "users");
  const { params: movie } = useRoute();
  const { currentUser } = useAuth();
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(function () {
    async function checkIfFavorite() {
      try {
        const data = await getDocs(usersCollectionRef);
        const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const user = users.find((user) => user.email === currentUser.email);
        // console.log(user);
        const value = user.favoriteMovies.some((mov) => mov.id === movie.id);
        setIsFavorite(value);
      } catch (err) {
        console.log(err.message);
        setIsFavorite(false);
      }
    }
    checkIfFavorite();
  });
  const [movieDetails, setMovieDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [castMembers, setCastMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    getMovieData();
  }, []);

  async function getMovieData() {
    try {
      const details = await fetchMovieDetails(movie.id);
      setMovieDetails(details);
      const similar = await fetchSimilarMovies(movie.id);
      setSimilarMovies(similar.results);
      const credits = await fetchMovieCredits(movie.id);
      setCastMembers(credits.cast);

      // console.log(similar);
      // console.log(movie.id);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleClickOnFavorite() {
    // console.log(currentUser);
    try {
      const data = await getDocs(usersCollectionRef);
      const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const user = users.find((user) => user.email === currentUser.email);
      // console.log(user);
      const userDoc = doc(db, "users", user.id);

      if (isFavorite) {
        const newFields = {
          favoriteMovies: user.favoriteMovies.filter(
            (mov) => mov.id !== movie.id
          ),
        };
        await updateDoc(userDoc, newFields);
      } else {
        const newFields = {
          favoriteMovies: [
            ...user.favoriteMovies,
            // {
            //   movie_id: movie.id,
            //   posterPath: movie.poster_path,
            //   title: movie.title,
            // },
            movie,
          ],
        };
        await updateDoc(userDoc, newFields);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.log(err.message);
    }
  }

  if (loading || !movieDetails) return <LoadingScreen />;
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="bg-neutral-900"
    >
      {/* Back Button & favorite button & Poster */}
      <View className="w-full">
        <SafeAreaView
          className={`absolute z-20 w-full  flex-row justify-between items-center px-4 ${MarginTop}`}
        >
          <TouchableOpacity
            className="rounded-xl p-1 bg-cyan-500"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClickOnFavorite}>
            <HeartIcon
              size="35"
              strokeWidth={2.5}
              color={isFavorite ? "cyan" : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <View>
              <Image
                // source={require("../../assets/images/poster.webp")}
                source={{
                  uri:
                    imageOriginal(movie.backdrop_path) ||
                    fullbackMoviePosterImage,
                }}
                style={{ height: window.height * 0.55, width: window.width }}
                resizeMode="cover"
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1)",
                ]}
                style={{ width: window.width, height: window.height * 0.4 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
            {/* Movie Details*/}
            <View
              className="space-y-3"
              styles={{ marginTop: -(window.height * 0.09) }}
            >
              {/* title */}
              <Text className="text-white text-center text-3xl font-bold tracking-wider">
                {movie.title}
              </Text>
              {/* Status, release, runtime */}
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {movieDetails?.status} -{" "}
                {movieDetails?.release_date.split("-")[0]} -{" "}
                {movieDetails?.runtime} min
              </Text>
              <View className="flex-row justify-center mx-4 space-x-2">
                {movieDetails.genres.map((genre, index) => {
                  return (
                    <Text
                      key={genre.id}
                      className="text-neutral-400 font-semibold text-base text-center"
                    >
                      {genre.name}{" "}
                      {index < movieDetails.genres.length - 1 ? "- " : ""}
                    </Text>
                  );
                })}
              </View>
              <Text className="text-neutral-400 mx-4 tracking-wide text-center mt-3">
                {movie.overview}
              </Text>
            </View>

            {/* Cast members */}
            <Cast members={castMembers} navigation={navigation} />

            <MoviesList
              title="Simila Movies"
              data={similarMovies}
              hideSeeAll={true}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default MovieScreen;
