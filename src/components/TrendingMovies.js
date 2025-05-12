import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { BlurView as _BlurView } from "expo-blur";
import { parallaxLayout } from "../utils/parallax";
import { Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import ListTitle from "./ListTitle";
import { fullbackMoviePosterImage, IMAGES_BASE_URL } from "../utils/constants";
import { imageOriginal } from "../api/moviesdb";

const BlurView = Animated.createAnimatedComponent(_BlurView);
const window = Dimensions.get("window");
const PAGE_WIDTH = window.width / 2;

const SlideItem = ({ item, handlePress }) => {
  // console.log(item.poster_path);

  return (
    <TouchableWithoutFeedback onPress={() => handlePress(item)}>
      <Image
        source={{
          uri: imageOriginal(item.poster_path) || fullbackMoviePosterImage,
        }}
        // source={require("../../assets/images/poster.webp")}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
    </TouchableWithoutFeedback>
  );
};

const CustomItem = ({ item, index, animationValue, handlePress }) => {
  const maskStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationValue.value, [-1, 0, 1], [1, 0, 1]);
    return {
      opacity,
    };
  }, [animationValue]);

  return (
    <View
      style={{
        flex: 1,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}
    >
      <View style={{ flex: 1, width: "100%" }}>
        <SlideItem item={item} handlePress={handlePress} />
      </View>
      <BlurView
        intensity={50}
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          maskStyle,
          Platform.OS === "android" && {
            // opacity: maskStyle.initial.value.opacity,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        ]}
      />
    </View>
  );
};

function TrendingMovies({ movies }) {
  const navigation = useNavigation();

  function handlePress(item) {
    navigation.navigate("Movie", item);
  }

  return (
    <View className="flex-1 my-3">
      <ListTitle title="Trending" custom="mx-4" />
      <Carousel
        loop={true}
        style={{
          width: window.width,
          height: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
        width={PAGE_WIDTH}
        data={movies}
        renderItem={({ item, index, animationValue }) => {
          return (
            <CustomItem
              item={item}
              key={item.id}
              index={index}
              animationValue={animationValue}
              handlePress={handlePress}
            />
          );
        }}
        customAnimation={parallaxLayout(
          {
            size: PAGE_WIDTH,
            vertical: false,
          },
          {
            parallaxScrollingScale: 0.95,
            parallaxAdjacentItemScale: 0.7,
            parallaxScrollingOffset: 20,
          }
        )}
        scrollAnimationDuration={1200}
      />
    </View>
  );
}

export default TrendingMovies;
