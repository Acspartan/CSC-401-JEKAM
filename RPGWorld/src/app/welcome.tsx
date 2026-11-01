
import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function Welcome() {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push("/login")}
    >
      <View style={styles.content}>
        <Text style={styles.title}>CAMPUS RPG</Text>

        <Text style={styles.subtitle}>
          Welcome to Campus RPG!
        </Text>

        <Text style={styles.continueText}>
          PRESS ANYWHERE TO CONTINUE
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#172334",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#aaa",
    marginTop: 15,
    textAlign: "center",
  },
  continueText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#90baff",
    marginTop: 100,
    textAlign: "center",
  },
});
