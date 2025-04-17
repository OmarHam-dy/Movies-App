import { useNavigation, useRoute } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
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

const movieName = "In the Lost Lands";
const window = Dimensions.get("window");
const ios = Platform.OS === "ios";
const MarginTop = ios ? 0 : "mt-10";

function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavoirte] = useState(false);
  const [castMembers, setCastMembers] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);

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
          <TouchableOpacity onPress={() => setIsFavoirte(!isFavorite)}>
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
                source={require("../../assets/images/poster.webp")}
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
                {movieName}
              </Text>
              {/* Status, release, runtime */}
              <Text className="text-neutral-400 font-semibold text-base text-center">
                Released - 2023 - 1h 30m
              </Text>
              <View className="flex-row justify-center mx-4 space-x-2">
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  Action -
                </Text>
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  Thrill -
                </Text>
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  Comedy
                </Text>
              </View>
              <Text className="text-neutral-400 mx-4 tracking-wide">
                A queen sends the powerful and feared sorceress Gray Alys to the
                ghostly wilderness of the Lost Lands in search of a magical
                power, where the sorceress and her guide, the drifter Boyce must
                outwit and outfight man and demon.
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
