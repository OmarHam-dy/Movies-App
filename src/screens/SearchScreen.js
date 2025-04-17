import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
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

const movieName = "In the Lost Lands";
const window = Dimensions.get("window");

function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView className="bg-neutral-900 flex-1 pt-10">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Movie..."
          placeholderTextColor="lightgray"
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
                {results.map((item, index) => {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => navigation.push("Movie", item)}
                    >
                      <View className="space-y-2 mb-4">
                        <Image
                          source={require("../../assets/images/poster2.webp")}
                          className="rounded-3xl"
                          style={{
                            width: window.width * 0.44,
                            height: window.height * 0.3,
                          }}
                        />
                        <Text className="text-neutral-300 ml-1">
                          {movieName.length > 22
                            ? movieName.slice(0, 22) + "..."
                            : movieName}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ) : (
              <View className="flex-row justify-center">
                <Text className="text-neutral-500 font-semibold text-base">
                  No results found...
                </Text>
              </View>
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

export default SearchScreen;
