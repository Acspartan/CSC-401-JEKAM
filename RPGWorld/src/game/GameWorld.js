import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import buildings from "./data/buildings";
import Building from "./components/Building";

// Total size of world in pixels
const WORLD_WIDTH = 2100;
const WORLD_HEIGHT = 1250;

export default function GameWorld() {
  return (
    // Vertical scrolling
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ height: WORLD_HEIGHT }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* Horizontal scrolling */}
      <ScrollView
        horizontal
        contentContainerStyle={{ width: WORLD_WIDTH }}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        {/* The World*/}
        <View style={styles.gameWorld}>
          {buildings.map((building) => (
            <Building key={building.id} building={building} />
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#7ec850",
  },
  gameWorld: {
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT,
    backgroundColor: "#7ec850",
  },
});