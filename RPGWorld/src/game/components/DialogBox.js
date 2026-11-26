import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const DialogBox = ({
  messages = [],
  speaker = "Edith",
  onComplete,
  initialMessageIndex = 0,
  namePrompt = false,
  name = "",
  onNameChange,
  onNameSubmit,
}) => {
  const [currentMessage, setCurrentMessage] = useState(initialMessageIndex);
  const [isSavingName, setIsSavingName] = useState(false);
  const [nameSaveError, setNameSaveError] = useState("");

  if (messages.length === 0) {
    return null;
  }

  const handleNext = async () => {
    if (namePrompt && currentMessage === initialMessageIndex) {
      const enteredName = name.trim().replace(/\s+/g, " ");
      if (!/^\p{L}+(?: \p{L}+)*$/u.test(enteredName)) {
        setNameSaveError("Use letters only. Spaces are allowed between names.");
        return;
      }

      setIsSavingName(true);
      setNameSaveError("");
      try {
        await onNameSubmit?.(enteredName);
      } catch (error) {
        setNameSaveError(error?.message || "Could not save your name. Please try again.");
        setIsSavingName(false);
        return;
      }
      setIsSavingName(false);
    }

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
      {namePrompt && currentMessage === initialMessageIndex && (
        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={(text) => onNameChange?.(text.replace(/[^\p{L} ]/gu, ""))}
          editable={!isSavingName}
          placeholder="Type your name"
          placeholderTextColor="#666"
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={handleNext}
        />
      )}
      {nameSaveError ? <Text style={styles.error}>{nameSaveError}</Text> : null}
      <Pressable
        onPress={handleNext}
        disabled={isSavingName || (namePrompt && currentMessage === initialMessageIndex && !name.trim())}
      >
        <Text style={styles.footer}>
          {isSavingName
            ? "Saving..."
            : namePrompt && currentMessage === initialMessageIndex
              ? "Continue"
              : "Next"}
        </Text>
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
  nameInput: {
    backgroundColor: "#fffaf2",
    borderColor: "#252525",
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#252525",
  },
  error: {
    color: "#8b1e1e",
    marginTop: 8,
  },
  footer: {
    marginTop: 12,
    textAlign: "right",
  },
});

export default DialogBox;
