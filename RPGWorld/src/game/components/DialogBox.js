import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const DialogBox = ({ messages = [], speaker = "Dr. Gourd", onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);

  if (messages.length === 0) {
    return null;
  }

  const handleNext = () => {
    if (currentMessage < messages.length - 1) {
      setCurrentMessage((previous) => previous + 1);
    } else if (onComplete) {
      onComplete();
    } else {
      setCurrentMessage(0);
    }
  };

  return (
    <View style={styles.dialogWindow}>
      <Text style={styles.title}>{speaker}</Text>
      <Text style={styles.message}>{messages[currentMessage]}</Text>
      <Pressable onPress={handleNext}>
        <Text style={styles.footer}>Next</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  dialogWindow: {
    backgroundColor: "#e2b27e",
    borderWidth: 4,
    borderColor: "#252525",
    borderRadius: 8,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
  },
  footer: {
    marginTop: 12,
    textAlign: "right",
  },
});

export default DialogBox;