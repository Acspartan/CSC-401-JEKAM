import { View } from "react-native";

export default function PlayerRenderer({ position }) {

  return (
    <View
      style={{
        position: "absolute",

        left: position[0],
        top: position[1],

        width: 40,
        height: 40,

        borderRadius: 20,

        backgroundColor: "blue"
      }}
    />
  );
}