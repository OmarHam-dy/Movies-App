import { useNavigation, useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import DropShadow from "react-native-drop-shadow";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { Shadow } from "react-native-shadow-2";
import MoviesList from "../components/MoviesList";
import LoadingScreen from "./LoadingScreen";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  image200,
  image500,
} from "../api/moviesdb";
import { fullbackPersonImage } from "../utils/constants";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthProvider";
import { db } from "../../firebase-config";

let window = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticalMargin = ios ? 0 : "my-10";

function PersonScreen() {
  const usersCollectionRef = collection(db, "users");
  const navigation = useNavigation();
  const { params: member } = useRoute();
  const { currentUser } = useAuth();

  const [isFavorite, setIsFavorite] = useState(function () {
    async function checkIfFavorite() {
      try {
        const data = await getDocs(usersCollectionRef);
        const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const user = users.find((user) => user.email === currentUser.email);
        // console.log(user);
        const value = user.favoriteActors.some(
          (actor) => actor.id === member.id
        );
        setIsFavorite(value);
      } catch (err) {
        console.log(err.message);
        setIsFavorite(false);
      }
    }
    checkIfFavorite();
  });
  const [personDetails, setPersonDetails] = useState(null);
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    getPersonData();
  }, []);

  async function getPersonData() {
    try {
      const details = await fetchPersonDetails(member.id);
      setPersonDetails(details);
      const movies = await fetchPersonMovies(member.id);
      setPersonMovies(movies.cast);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleClickOnFavorite() {
    try {
      const data = await getDocs(usersCollectionRef);
      const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const user = users.find((user) => user.email === currentUser.email);
      const userDoc = doc(db, "users", user.id);
      if (isFavorite) {
        const newFields = {
          favoriteActors: user.favoriteActors.filter(
            (actor) => actor.id !== member.id
          ),
        };
        await updateDoc(userDoc, newFields);
      } else {
        const newFields = { favoriteActors: [...user.favoriteActors, member] };
        await updateDoc(userDoc, newFields);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.log(err.message);
    }
  }

  function getGender(id) {
    if (id === 0) return "Not set";
    if (id === 1) return "Female";
    if (id === 2) return "Male";
    return "Non-binary";
  }

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView
        className={`absolute z-20 w-full  flex-row justify-between items-center px-4 ${verticalMargin}`}
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
          {/* Person Details */}
          <View>
            <View className="flex-row justify-center pt-24">
              <View
                className="items-center rounded-full overflow-hidden w-72 h-72 border-2 border-neutral-500"
                style={{
                  shadowColor: "gray",
                  shadowRadius: 40,
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 1,
                  elevation: 30,
                }}
              >
                <Image
                  // source={require("../../assets/images/person.webp")}
                  source={{
                    uri:
                      image500(personDetails.profile_path) ||
                      fullbackPersonImage,
                  }}
                  style={{
                    height: window.height * 0.43,
                    width: window.width * 0.74,
                  }}
                />
              </View>
            </View>
            <View className="mt-6">
              <Text className="text-3xl text-white font-bold  text-center">
                {personDetails?.name}
              </Text>
              <Text className="text-base text-neutral-500 text-center">
                {personDetails?.place_of_birth}
              </Text>
            </View>
            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white text-sm font-semibold">Gender</Text>
                <Text className="text-neutral-500 text-sm">
                  {getGender(personDetails?.gender)}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white text-sm font-semibold">
                  Birthday
                </Text>
                <Text className="text-neutral-500 text-sm">
                  {personDetails?.birthday}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white text-sm font-semibold">
                  Known for
                </Text>
                <Text className="text-neutral-500 text-sm">
                  {personDetails?.known_for_department}
                </Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white text-sm font-semibold">
                  Pupularity
                </Text>
                <Text className="text-neutral-500 text-sm">
                  {personDetails?.popularity.toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-400 tracking-wide">
                {personDetails?.biography}
              </Text>
            </View>
            <MoviesList data={personMovies} title="Movies" hideSeeAll={true} />
          </View>
        </>
      )}
    </ScrollView>
  );
}

export default PersonScreen;
