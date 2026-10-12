import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Building({ building }) {
  return (
    <View
      style={[
        styles.building,
        {
          left: building.position.x,
          top: building.position.y,
          width: building.size.width,
          height: building.size.height,
        },
      ]}
    >
      <Text style={styles.buildingEmoji}>🏫</Text>

      <Text style={styles.buildingName}>
        {building.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  building: {
    position: "absolute",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  buildingEmoji: {
    fontSize: 35,
  },

  buildingName: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
  },
});