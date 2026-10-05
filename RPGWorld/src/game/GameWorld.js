import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

export default function GameWorld() {
  const [player, setPlayer] = useState({
    x: 150,
    y: 250,
  });

  const movePlayer = (dx, dy) => {
    setPlayer((current) => ({
      x: current.x + dx,
      y: current.y + dy,
    }));
  };

  return (
    <View style={styles.gameWorld}>
      {/* Player */}
      <View
        style={[
          styles.player,
          {
            left: player.x,
            top: player.y,
          },
        ]}
      />

      {/* Movement controls */}
      <View style={styles.controls}>
        <Pressable
          style={styles.button}
          onPress={() => movePlayer(0, -20)}
        >
          <Text style={styles.buttonText}>↑</Text>
        </Pressable>

        <View style={styles.middleRow}>
          <Pressable
            style={styles.button}
            onPress={() => movePlayer(-20, 0)}
          >
            <Text style={styles.buttonText}>←</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => movePlayer(20, 0)}
          >
            <Text style={styles.buttonText}>→</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => movePlayer(0, 20)}
        >
          <Text style={styles.buttonText}>↓</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gameWorld: {
    flex: 1,
    backgroundColor: "#7ec850",
  },

  player: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "blue",
  },

  controls: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    alignItems: "center",
  },

  middleRow: {
    flexDirection: "row",
  },

  button: {
    width: 60,
    height: 60,
    margin: 4,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 30,
  },
});