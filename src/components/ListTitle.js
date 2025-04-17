import { Text, View } from "react-native";

function ListTitle({ title, custom = "" }) {
  return <Text className={"text-white text-xl " + custom}>{title}</Text>;
}

export default ListTitle;
