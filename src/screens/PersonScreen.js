import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
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

let window = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticalMargin = ios ? 0 : "my-10";
function PersonScreen() {
  const navigation = useNavigation();
  const [isFavorite, setIsFavoirte] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);

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
                  source={require("../../assets/images/person.webp")}
                  style={{
                    height: window.height * 0.43,
                    width: window.width * 0.74,
                  }}
                />
              </View>
            </View>
            <View className="mt-6">
              <Text className="text-3xl text-white font-bold  text-center">
                Keanu Reaves
              </Text>
              <Text className="text-base text-neutral-500 text-center">
                London, United Kingdom
              </Text>
            </View>
            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white text-sm font-semibold">Gender</Text>
                <Text className="text-neutral-500 text-sm">Male</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white text-sm font-semibold">
                  Birthday
                </Text>
                <Text className="text-neutral-500 text-sm">1964-4-5</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white text-sm font-semibold">
                  Known for
                </Text>
                <Text className="text-neutral-500 text-sm">Acting</Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white text-sm font-semibold">
                  Pupularity
                </Text>
                <Text className="text-neutral-500 text-sm">6.45</Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-400 tracking-wide">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                laudantium dolore a rem sequi autem. Impedit, omnis? Atque,
                voluptatum nam quasi earum accusantium placeat excepturi nobis
                vel asperiores totam laborum!
              </Text>
            </View>
            <MoviesList data={personMovies} title="Movies" />
          </View>
        </>
      )}
    </ScrollView>
  );
}

export default PersonScreen;
