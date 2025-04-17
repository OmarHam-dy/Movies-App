import { Dimensions, View } from "react-native";
import * as Progress from "react-native-progress";

const window = Dimensions.get("window");

function LoadingScreen() {
  return (
    <View
      className=" z-0 flex-row justify-center items-center bg-neutral-900"
      style={{ width: window.width, height: window.height }}
    >
      <Progress.CircleSnail thickness={12} size={160} color={["cyan"]} />
    </View>
  );
}

export default LoadingScreen;
