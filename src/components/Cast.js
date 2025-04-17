import { Image, TouchableOpacity } from "react-native";
import { Text, View, ScrollView } from "react-native";

function Cast({ members, navigation }) {
  const characterName = "John Wick";
  const personName = "Keanu Reeves";

  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {members &&
          members.map((member, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => navigation.navigate("Person", member)}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500 ">
                  <Image
                    source={require("../../assets/images/person.webp")}
                    className="rounded-2xl h-24 w-20"
                  />
                </View>
                <Text className="text-white text-xs mt-1">
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + "..."
                    : characterName}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {personName.length > 10
                    ? personName.slice(0, 10) + "..."
                    : characterName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}

export default Cast;
