
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";

export default function MainMenu() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        CAMPUS RPG
      </Text>

      <Text style={styles.subtitle}>
        Choose Your Adventure
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/")}
      >
        <Text style={styles.buttonText}>
          NEW GAME
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Alert.alert(
            "Load Game",
            "Saved games are not available yet."
          )
        }
      >
        <Text style={styles.buttonText}>
          LOAD GAME
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>
          BACK
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#172334",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#aaa",
    marginBottom: 60,
  },
  button: {
    backgroundColor: "#347ad0",
    padding: 18,
    width: "80%",
    maxWidth: 350,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  backText: {
    color: "#90baff",
    fontSize: 16,
    marginTop: 25,
  },
});
