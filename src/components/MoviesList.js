import { useNavigation } from "@react-navigation/core";
import { Dimensions } from "react-native";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ListTitle from "./ListTitle";

const window = Dimensions.get("window");

const movieName =
  "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function MoviesList({ title, data, hideSeeAll = false }) {
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <ListTitle title={title} />
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-cyan-500 text-lg"> See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => (
          <MovieCard movie={item} key={index} />
        ))}
      </ScrollView>
    </View>
  );
}

function MovieCard({ movie }) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => navigation.push("Movie", movie)}>
      <View className="space-y-1 my-4 mx-1">
        <Image
          source={require("../../assets/images/poster2.webp")}
          className="rounded-3xl"
          style={{
            width: window.width * 0.33,
            height: window.height * 0.25,
          }}
        />
        <Text className="text-neutral-300 ml-2">
          {movieName.length > 14 ? movieName.slice(0, 11) + "..." : movieName}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
