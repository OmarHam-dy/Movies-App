import { Image, TouchableOpacity } from "react-native";
import { Text, View, ScrollView } from "react-native";
import { fullbackPersonImage } from "../utils/constants";
import { image200 } from "../api/moviesdb";

function Cast({ members, navigation }) {
  const characterName = "John Wick";
  const personName = "Keanu Reeves";
  // console.log(members);

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
          members.map((member) => {
            // console.log(member);

            return (
              <TouchableOpacity
                key={member.id}
                className="mr-4 items-center"
                onPress={() => navigation.navigate("Person", member)}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500 ">
                  <Image
                    source={{
                      uri: image200(member.profile_path) || fullbackPersonImage,
                    }}
                    // source={require("../../assets/images/person.webp")}
                    className="rounded-2xl h-24 w-20"
                  />
                </View>
                <Text className="text-white text-xs mt-1">
                  {member.character.length > 10
                    ? member.character.slice(0, 10) + "..."
                    : member.character}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {member.original_name.length > 10
                    ? member.original_name.slice(0, 10) + "..."
                    : member.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}

export default Cast;
