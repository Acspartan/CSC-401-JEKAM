
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
import QuestWindow from "./components/QuestWindow";


// Character -> Player -> PlayableCharacter
import {
  PlayableCharacter as PlayableCharacterModel,
} from "../models/PlayableCharacter";

// Campus dimensions
const WORLD_WIDTH = 2100;
const WORLD_HEIGHT = 1250;

// Player dimensions
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 48;


export default function GameWorld() {

  // Create player from inherited class
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

  // Controls Quest window visibility
  const [questOpen, setQuestOpen] = useState(false);

  // Move player using PlayableCharacter class
  const movePlayer = useCallback((direction) => {
    setPlayer((previous) => {

      const updated = new PlayableCharacterModel(
          previous.name,
          previous.health,
          previous.level,
          previous.attackPower,
          previous.username,
          previous.x,
          previous.y
      );

      // Preserve player progress
      updated.experience = previous.experience;
      updated.speed = previous.speed;

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

      // Keep player inside campus boundaries
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

  // Keyboard movement for Expo Web
  useEffect(() => {

    if (typeof window === "undefined") {
      return;
    }

    const handleKeyDown = (event) => {

      // Ignore typing inside input fields
      const tag = event.target?.tagName;

      if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          event.target?.isContentEditable
      ) {
        return;
      }

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

      const direction =
          directions[event.key.toLowerCase()];

      if (direction) {
        event.preventDefault();
        movePlayer(direction);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
          "keydown",
          handleKeyDown
      );
    };

  }, [movePlayer]);

  return (
      <View style={styles.container}>

        {/* CAMPUS MAP */}
        {/* Scroll added to accomidate different screen sizes */}
        <ScrollView
            style={styles.screen}
            contentContainerStyle={{
              height: WORLD_HEIGHT,
            }}
            showsVerticalScrollIndicator={false}
            bounces={false}
        >

          <ScrollView
              horizontal
              contentContainerStyle={{
                width: WORLD_WIDTH,
              }}
              showsHorizontalScrollIndicator={false}
              bounces={false}
          >

            <View style={styles.gameWorld}>

              {/* Existing campus buildings */}
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

        {/* DIRECTIONAL CONTROLS */}
        <View style={styles.controls}>

          {/* Up */}
          <Pressable
              style={styles.button}
              onPress={() => movePlayer("up")}
          >
            <Text style={styles.buttonText}>
              ↑
            </Text>
          </Pressable>

          <View style={styles.horizontalControls}>

            {/* Left */}
            <Pressable
                style={styles.button}
                onPress={() => movePlayer("left")}
            >
              <Text style={styles.buttonText}>
                ←
              </Text>
            </Pressable>

            {/* Down */}
            <Pressable
                style={styles.button}
                onPress={() => movePlayer("down")}
            >
              <Text style={styles.buttonText}>
                ↓
              </Text>
            </Pressable>

            {/* Right */}
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

        {/* QUEST WINDOW */}
        {questOpen && (
            <View style={styles.questPanel}>
              <QuestWindow player={player} />
            </View>
        )}

        {/* BOTTOM-LEFT QUEST BUTTON */}
        <Pressable
            style={styles.questButton}
            onPress={() => setQuestOpen((previous) => !previous)}
        >
          <Text style={styles.questButtonText}>
            {questOpen ? "Close Quests" : "Quests"}
          </Text>
        </Pressable>

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

  // Fixed Quest Log and Character Status panel
  questPanel: {
    position: "absolute",
    bottom: 90,
    left: 20,
    width: 300,
    height: 520,
    zIndex: 1500,
    elevation: 10,
  },

  // Bottom-left Quest button
  questButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#252525",
    borderWidth: 2,
    borderColor: "#888888",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 22,
    zIndex: 2000,
    elevation: 11,
  },

  questButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Directional controls
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
