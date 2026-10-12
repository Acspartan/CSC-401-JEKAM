import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

import buildings from "./data/buildings";
import Building from "./components/Building";

export default function GameWorld() {



  return (
    <View style={styles.gameWorld}>

      {/* Buildings */}
      {buildings.map((building) => (
        <Building
          key={building.id}
          building={building}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gameWorld: {
    flex: 1,
    backgroundColor: "#7ec850",
  },
});