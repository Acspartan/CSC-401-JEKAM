
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";

import buildings from "./data/buildings";
import Building from "./components/Building";
import PlayableCharacterView from "./components/PlayableCharacter";

// Character -> Player -> PlayableCharacter
import {
  PlayableCharacter as PlayableCharacterModel
} from "../models/PlayableCharacter";

// Campus world dimensions
const WORLD_WIDTH = 2100;
const WORLD_HEIGHT = 1250;

// Player dimensions
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 48;

export default function GameWorld() {

  // Create the playable character using inheritance
  const [player, setPlayer] = useState(() =>
      new PlayableCharacterModel(
          "Hero",
          100,
          1,
          10,
          "Player1",
          400,
          300
      )
  );

  // Handle character movement
  const movePlayer = useCallback((direction) => {

    setPlayer((previous) => {

      // Create a new instance of the actual class
      const updated = new PlayableCharacterModel(
          previous.name,
          previous.health,
          previous.level,
          previous.attackPower,
          previous.username,
          previous.x,
          previous.y
      );

      // Preserve character attributes
      updated.experience = previous.experience;
      updated.speed = previous.speed;

      // Use the movement methods in PlayableCharacter.ts
      switch (direction) {
        case "up":
          updated.moveUp();
          break;

        case "down":
          updated.moveDown();
          break;

        case "left":
          updated.moveLeft();
          break;

        case "right":
          updated.moveRight();
          break;

        default:
          return previous;
      }

      // Prevent movement outside the map
      updated.x = Math.max(
          0,
          Math.min(
              updated.x,
              WORLD_WIDTH - PLAYER_WIDTH
          )
      );

      updated.y = Math.max(
          0,
          Math.min(
              updated.y,
              WORLD_HEIGHT - PLAYER_HEIGHT
          )
      );

      return updated;
    });

  }, []);

  // Keyboard controls for Expo Web
  useEffect(() => {

    if (typeof window === "undefined") {
      return;
    }

    const handleKeyDown = (event) => {

      const key = event.key.toLowerCase();

      const directions = {
        w: "up",
        arrowup: "up",

        s: "down",
        arrowdown: "down",

        a: "left",
        arrowleft: "left",

        d: "right",
        arrowright: "right",
      };

      const direction = directions[key];

      if (direction) {
        event.preventDefault();
        movePlayer(direction);
      }
    };

    window.addEventListener(
        "keydown",
        handleKeyDown
    );

    return () => {
      window.removeEventListener(
          "keydown",
          handleKeyDown
      );
    };

  }, [movePlayer]);

  return (
      <View style={styles.container}>

        {/* Vertical campus scrolling */}
        <ScrollView
            style={styles.screen}
            contentContainerStyle={{
              height: WORLD_HEIGHT,
            }}
            showsVerticalScrollIndicator={false}
            bounces={false}
        >

          {/* Horizontal campus scrolling */}
          <ScrollView
              horizontal
              contentContainerStyle={{
                width: WORLD_WIDTH,
              }}
              showsHorizontalScrollIndicator={false}
              bounces={false}
          >

            {/* Campus map */}
            <View style={styles.gameWorld}>

              {/* Existing buildings */}
              {buildings.map((building) => (
                  <Building
                      key={building.id}
                      building={building}
                  />
              ))}

              {/* Playable character */}
              <PlayableCharacterView
                  x={player.x}
                  y={player.y}
              />

            </View>

          </ScrollView>

        </ScrollView>

        {/* Movement controls */}
        <View style={styles.controls}>

          {/* Move up */}
          <Pressable
              style={styles.button}
              onPress={() => movePlayer("up")}
          >
            <Text style={styles.buttonText}>
              ↑
            </Text>
          </Pressable>

          <View style={styles.horizontalControls}>

            {/* Move left */}
            <Pressable
                style={styles.button}
                onPress={() => movePlayer("left")}
            >
              <Text style={styles.buttonText}>
                ←
              </Text>
            </Pressable>

            {/* Move down */}
            <Pressable
                style={styles.button}
                onPress={() => movePlayer("down")}
            >
              <Text style={styles.buttonText}>
                ↓
              </Text>
            </Pressable>

            {/* Move right */}
            <Pressable
                style={styles.button}
                onPress={() => movePlayer("right")}
            >
              <Text style={styles.buttonText}>
                →
              </Text>
            </Pressable>

          </View>

        </View>

      </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: "#7ec850",
  },

  gameWorld: {
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT,
    backgroundColor: "#7ec850",
  },

  controls: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
    zIndex: 2000,
  },

  horizontalControls: {
    flexDirection: "row",
    gap: 8,
  },

  button: {
    width: 52,
    height: 52,
    backgroundColor: "#25384d",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
  },

  buttonText: {
    fontSize: 26,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

});
