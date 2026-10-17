import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import buildingImages from "../data/buildingImages";

export default function Building({ building }) {
  const imageSource = buildingImages[building.image];

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
      {imageSource ? (
        <Image
          source={imageSource}
          style={styles.buildingImage}
          resizeMode="contain"
        />
      ) : (
        <Text style={styles.buildingEmoji}>🏫</Text>
      )}

      <Text style={styles.buildingName} numberOfLines={2}>
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

  buildingImage: {
    width: "100%",
    height: "70%",
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