import React, { useState, useEffect, useCallback } from "react";

import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";

//code from: https://codeworkshop.dev/doc/2020-03-01-creating-an-rpg-dialog-effect-with-react-and-react-spring
import DialogBox from "./components/DialogBox";
import { supabase } from "../../lib/supabase";


// Just hard coding these for now to demonstrate our DialogBox component.
const messages = [
  "This is a very cool RPG dialog message.",
 // "If you would like to see more awesome stuff, check out the other writeups at codeworkshop.dev!",
 // "Remember to wash your hands!",
];

// Campus buildings
import buildings from "./data/buildings";

// Game components
import Building from "./components/Building";
import PlayableCharacterView from "./components/PlayableCharacter";
import { SceneScreen, useSceneFlow } from "./SceneFlow";
import { QuestHUD, useQuestFlow } from "./QuestFlow";

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

  return updated;
}

export default function GameWorld() {
  const sceneFlow = useSceneFlow();

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

  const awardQuestExperience = useCallback((amount) => {
    setPlayer((previous) => {
      const updated = copyPlayer(previous);
      updated.gainExperience(amount);
      return updated;
    });
  }, []);

  const questFlow = useQuestFlow(player, awardQuestExperience);

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
        {sceneFlow.scene.type === "image" ? (
          <SceneScreen
            activeScene={sceneFlow.activeScene}
            selectedSceneChoice={sceneFlow.selectedSceneChoice}
            selectedChoice={sceneFlow.selectedChoice}
            showSceneChoices={sceneFlow.showSceneChoices}
            player={player}
            playerName={sceneFlow.playerName}
            onPlayerNameChange={sceneFlow.setPlayerName}
            onNameSubmit={async (name) => {
              const { data: { user }, error: userError } =
                await supabase.auth.getUser();
              if (userError) throw userError;
              if (!user) {
                throw new Error("Please log in before saving your name.");
              }

              const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .update({ Name: name })
                .eq("id", user.id)
                .select("id")
                .maybeSingle();

              if (profileError) throw profileError;
              if (!profile) {
                throw new Error("Your profile could not be found.");
              }

              setPlayer((previous) => {
                const updated = copyPlayer(previous);
                updated.name = name;
                return updated;
              });
            }}
            onComplete={sceneFlow.goToNextScene}
            onChooseSceneOption={sceneFlow.chooseSceneOption}
          />
        ) : (
          <>
            {/* CAMPUS MAP */}
            <ScrollView
                style={styles.screen}
                contentContainerStyle={{ height: WORLD_HEIGHT }}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
              <ScrollView
                  horizontal
                  contentContainerStyle={{ width: WORLD_WIDTH }}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
              >
                <View style={styles.gameWorld}>
                  {buildings.map((building) => (
                      <Building
                          key={building.id}
                          building={building}
                      />
                  ))}

                  <PlayableCharacterView
                      x={player.x}
                      y={player.y}
                  />
                </View>
              </ScrollView>
            </ScrollView>

            <View style={styles.dialogPanel}>
              <DialogBox
                key="campus-dialog"
                messages={messages}
              />
            </View>

            {/* DIRECTIONAL CONTROLS */}
            <View style={styles.controls}>
              <Pressable
                  style={styles.button}
                  onPress={() => movePlayer("up")}
              >
                <Text style={styles.buttonText}>↑</Text>
              </Pressable>

              <View style={styles.horizontalControls}>
                <Pressable
                    style={styles.button}
                    onPress={() => movePlayer("left")}
                >
                  <Text style={styles.buttonText}>←</Text>
                </Pressable>

                <Pressable
                    style={styles.button}
                    onPress={() => movePlayer("down")}
                >
                  <Text style={styles.buttonText}>↓</Text>
                </Pressable>

                <Pressable
                    style={styles.button}
                    onPress={() => movePlayer("right")}
                >
                  <Text style={styles.buttonText}>→</Text>
                </Pressable>
              </View>
            </View>

            <QuestHUD
              player={player}
              quests={questFlow.quests}
              questOpen={questFlow.questOpen}
              onToggle={questFlow.toggleQuestWindow}
            />
          </>
        )}

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

  dialogPanel: {
    position: "absolute",
    top: 800,
    right: 20,
    width: 320,
    zIndex: 2000,
    elevation: 11,
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
