import React, { useState, useEffect, useCallback, useRef } from "react";

import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";

// Campus buildings
import buildings from "./data/buildings";

// Game components
import Building from "./components/Building";
import PlayableCharacterView from "./components/PlayableCharacter";
import QuestWindow, { initialQuests } from "./components/QuestWindow";

// Game systems
import { isPlayerAtBuilding } from "./systems/buildingCollision";
import { updateQuestProgress } from "./systems/questTracker";

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

// Introductory quest ID
const INTRO_QUEST_ID = 4;

// Resolve building IDs and names to quest objective IDs.
// These aliases account for different naming conventions in campus data.
const QUEST_BUILDINGS = {
  mckay: "mackay",
  mackay: "mackay",
  mckayhall: "mackay",
  mackayhall: "mackay",
  morsani: "morsani",
  morsanihall: "morsani",
  tech: "jenkins",
  jenkins: "jenkins",
  jenkinshealthandtechnologybuilding: "jenkins",
  straz: "straz",
  strazhall: "straz",
  pepin: "pepin",
  pepinstadium: "pepin",
  library: "library",
  macdonaldkelcelibrary: "library",
};

function resolveBuildingObjective(building) {
  const candidates = [building.id, building.name, building.title, building.label];
  for (const value of candidates) {
    if (value == null) continue;
    const normalized = String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
    if (QUEST_BUILDINGS[normalized]) return QUEST_BUILDINGS[normalized];
    if (normalized.includes("jenkins")) return "jenkins";
    if (normalized.includes("macdonald") && normalized.includes("library")) return "library";
    if (normalized.includes("pepin")) return "pepin";
    if (normalized.includes("straz")) return "straz";
  }
  return null;
}

// Create initial quest state
function createInitialQuests() {
  return initialQuests.map((quest) => ({
    ...quest,
    objectives: (quest.objectives ?? []).map((objective) =>
        typeof objective === "object" && objective !== null
            ? { ...objective }
            : objective
    ),
  }));
}

// Create a new player while preserving progress
function copyPlayer(previous, level = previous.level) {
  const updated = new PlayableCharacterModel(
      previous.name,
      previous.health,
      level,
      previous.attackPower,
      previous.username,
      previous.x,
      previous.y
  );

  updated.experience = previous.experience;
  updated.speed = previous.speed;

  // Preserve quest reward information
  updated.introRewardClaimed =
      previous.introRewardClaimed ?? false;

  return updated;
}

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

  // Store quest progress
  const [quests, setQuests] = useState(createInitialQuests);

  // Controls quest window visibility
  const [questOpen, setQuestOpen] = useState(false);

  // Track visited buildings to avoid repeated updates
  const visitedBuildings = useRef(new Set());

  // Track movement between renders to complete directional objectives.
  const previousPosition = useRef({ x: player.x, y: player.y });

  // Track whether introduction reward has been processed
  const introRewardProcessed = useRef(false);

  // Move player using PlayableCharacter class
  const movePlayer = useCallback((direction) => {

    setPlayer((previous) => {

      const updated = copyPlayer(previous);

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

      // Avoid unnecessary updates if player cannot move
      if (
          updated.x === previous.x &&
          updated.y === previous.y
      ) {
        return previous;
      }

      return updated;
    });

  }, []);

  // Update movement quests only after the player actually changes position.
  useEffect(() => {
    const previous = previousPosition.current;
    const completedActions = [];

    if (player.x > previous.x) completedActions.push("east");
    if (player.x < previous.x) completedActions.push("west");
    if (player.y > previous.y) completedActions.push("south");
    if (player.y < previous.y) completedActions.push("north");

    previousPosition.current = { x: player.x, y: player.y };

    if (completedActions.length > 0) {
      // The player starts on the campus map; first movement confirms entry.
      completedActions.push("campus");
      setQuests((previousQuests) =>
        completedActions.reduce(
          (currentQuests, objectiveId) => updateQuestProgress(currentQuests, objectiveId),
          previousQuests
        )
      );
    }
  }, [player.x, player.y]);

  // Detect visits for both building-based quests.
  useEffect(() => {
    const newlyVisited = [];

    buildings.forEach((building) => {
      const objectiveId = resolveBuildingObjective(building);
      if (!objectiveId || visitedBuildings.current.has(objectiveId)) return;

      if (isPlayerAtBuilding(player, building)) {
        visitedBuildings.current.add(objectiveId);
        newlyVisited.push(objectiveId);
      }
    });

    if (newlyVisited.length > 0) {
      setQuests((previousQuests) =>
        newlyVisited.reduce(
          (currentQuests, objectiveId) => updateQuestProgress(currentQuests, objectiveId),
          previousQuests
        )
      );
    }
  }, [player.x, player.y]);

  // Award one level when introduction quest is completed
  useEffect(() => {

    const introQuest = quests.find(
        (quest) => String(quest.id) === String(INTRO_QUEST_ID)
    );

    if (
        !introQuest?.completed ||
        introRewardProcessed.current
    ) {
      return;
    }

    introRewardProcessed.current = true;

    setPlayer((previous) => {

      if (previous.introRewardClaimed) {
        return previous;
      }

      const updated = copyPlayer(
          previous,
          previous.level + 1
      );

      updated.introRewardClaimed = true;

      return updated;
    });

  }, [quests]);

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

        {/* CAMPUS MAP */}
        {/* Scroll added to accommodate different screen sizes */}
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
              <QuestWindow
                  player={player}
                  quests={quests}
              />
            </View>
        )}

        {/* BOTTOM-LEFT QUEST BUTTON */}
        <Pressable
            style={styles.questButton}
            onPress={() =>
                setQuestOpen((previous) => !previous)
            }
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
