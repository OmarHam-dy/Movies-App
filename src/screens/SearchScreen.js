import { useNavigation } from "@react-navigation/core";
import { useCallback, useEffect, useState } from "react";
import { Image } from "react-native";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import LoadingScreen from "./LoadingScreen";
import { debounce, set } from "lodash";
import { fetchSearchMovies, image500 } from "../api/moviesdb";
import { fullbackMoviePosterImage } from "../utils/constants";

const window = Dimensions.get("window");

function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(query) {
    try {
      setLoading(true);
      const data = await fetchSearchMovies(query);
      setResults(data.results);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-900 flex-1 pt-10">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Movie..."
          placeholderTextColor="lightgray"
          onChangeText={handleTextDebounce}
          className="py-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Result */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 15,
            }}
            className="space-y-3"
          >
            <Text className="text-white font-semibold ml-1 mb-2">
              Results ({results.length})
            </Text>
            {results.length > 0 ? (
              <View className="flex-row justify-between flex-wrap">
                {results.map((item) => {
                  return (
                    <TouchableWithoutFeedback
                      key={item.id}
                      onPress={() => navigation.push("Movie", item)}
                    >
                      <View className="space-y-2 mb-4">
                        <Image
                          // source={require("../../assets/images/poster2.webp")}
                          source={{
                            uri:
                              image500(item.poster_path) ||
                              fullbackMoviePosterImage,
                          }}
                          className="rounded-3xl"
                          style={{
                            width: window.width * 0.44,
                            height: window.height * 0.3,
                          }}
                        />
                        <Text className="text-neutral-300 ml-1">
                          {item.title.length > 15
                            ? item.title.slice(0, 15) + "..."
                            : item.title}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ) : (
              <View className="flex-row justify-center">
                {/* <Text className="text-neutral-500 font-semibold text-base">
                  No results found...
                </Text> */}
                <Image
                  source={require("../../assets/images/magnifying-glass.png")}
                  style={{
                    width: window.width * 0.6,
                    height: window.height * 0.4,
                    position: "absolute",
                    top: window.height * 0.2,
                    left: window.width * 0.2,
                    opacity: 0.5,
                  }}
                />
              </View>
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

export default SearchScreen;
