
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Temporary frontend validation only.
    // Supabase authentication will be added in a future sprint.
    setMessage(
      "Login form validated! Authentication will be connected in a future sprint."
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus RPG</Text>
      <Text style={styles.subtitle}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setMessage("");
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setMessage("");
        }}
      />

      {message ? (
        <Text style={styles.message}>{message}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.link}>
          Don't have an account? Sign Up
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
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 35,
  },
  input: {
    backgroundColor: "#293a50",
    color: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  message: {
    color: "#ffcc80",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#347ad0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#90baff",
    textAlign: "center",
    marginTop: 25,
  },
});
