import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";
import {
  PlayableCharacter as PlayableCharacterModel,
} from "../models/PlayableCharacter";

const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 48;

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

export function usePlayerFlow({ worldWidth, worldHeight }) {
  const [player, setPlayer] = useState(
    () =>
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

  const awardExperience = useCallback((amount) => {
    setPlayer((previous) => {
      const updated = copyPlayer(previous);
      updated.gainExperience(amount);
      return updated;
    });
  }, []);

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

      updated.x = Math.max(
        0,
        Math.min(updated.x, worldWidth - PLAYER_WIDTH)
      );
      updated.y = Math.max(
        0,
        Math.min(updated.y, worldHeight - PLAYER_HEIGHT)
      );

      if (updated.x === previous.x && updated.y === previous.y) {
        return previous;
      }

      return updated;
    });
  }, [worldHeight, worldWidth]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleKeyDown = (event) => {
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

      const direction = directions[event.key.toLowerCase()];

      if (direction) {
        event.preventDefault();
        movePlayer(direction);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movePlayer]);

  const savePlayerName = useCallback(async (name) => {
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
  }, []);

  return { player, movePlayer, awardExperience, savePlayerName };
}

export function PlayerControls({ onMove }) {
  return (
    <View style={styles.controls}>
      <Pressable style={styles.button} onPress={() => onMove("up")}>
        <Text style={styles.buttonText}>↑</Text>
      </Pressable>

      <View style={styles.horizontalControls}>
        <Pressable style={styles.button} onPress={() => onMove("left")}>
          <Text style={styles.buttonText}>←</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => onMove("down")}>
          <Text style={styles.buttonText}>↓</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => onMove("right")}>
          <Text style={styles.buttonText}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
