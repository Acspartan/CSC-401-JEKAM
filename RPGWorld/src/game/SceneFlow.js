import React, { useCallback, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import DialogBox from "./components/DialogBox";

const SCENES = {
  prologue_p1: {
    type: "image",
    image: require("./assets/backgrounds/prologue1.png"),
    portrait: require("./assets/portraits/guide_port.png"),
    dialogue: [
      "Ahoy matey! I’m Edith I’ll be your mentor on this journey! Are you ready to become the greatest pirate to ever be and set sail on this journey away from home?",
      "That’s a fine name indeed… I’ll tell you what [name], fill out this archive here and I’ll give you your first task.",
      "We still have a bit longer till we reach land ho. Tell me a little more about yourself. As we both know your studies are important, but there is more to life than your books! What do you like doing in your free time?",
      "OHO! Very interesting… I’ll keep this all in mind as I guide you through the rough waters of your first semester here. ",
      "Look ahead! LAND HO!!! PREPARE TO DOCK! ",
      "What a lovely place…oh I forgot to mention… as you complete the tasks I give you, I’ll give you a small reward for your trouble, feel free to trade them later for any cosmetics you like.",
      "Here, I’ll give you your first task now… open the map and visit each of the buildings your class is in, even if you’ve been before it will be good for you to remember them!",
      "Good Work! Knowing where your classes are will help you to stay on top of your studies here! As promised, here's a small reward you can use later.",
    ],
    nextScene: "PlantHall",
  },
  campus: {
    type: "game",
  },
  PlantHall: {
    type: "image",
    image: require("./assets/backgrounds/plantHallScene.png"),
    portrait: require("./assets/portraits/guide_port.png"),
    dialogue: [
      "Ah! We've landed on the history shores of Plant Hall! Back in my day this place used to be a hotel hosting over 500 rooms for travelers like me! Nowadays it's a hub for classrooms and offices",
    ],
    nextScene: "PlantHall",
  },
  campus: {
    type: "game",
  },
};

const SCENE_CHOICES = [
  {
    id: "excited",
    label: "Yes! I am excited",
    response:
      "Great! The sea is vast and wide with so much to do. Let's get you started out, first tell me your name…",
  },
  {
    id: "nervous",
    label: "I'm nervous…",
    response:
      "That’s okay we’ll guide our sails to some resources close to home that can help ease your mind, but first tell me, what’s your name, matey?",
  },
];

export function useSceneFlow() {
  const [activeScene, setActiveScene] = useState("prologue_p1");
  const [showSceneChoices, setShowSceneChoices] = useState(false);
  const [selectedSceneChoice, setSelectedSceneChoice] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const selectedChoice = SCENE_CHOICES.find(
    (choice) => choice.id === selectedSceneChoice
  );

  const chooseSceneOption = (choiceId) => {
    setSelectedSceneChoice(choiceId);
    setShowSceneChoices(false);
  };

  const goToNextScene = useCallback(() => {
    setActiveScene((currentScene) => {
      if (currentScene === "prologue_p1" && !selectedSceneChoice) {
        setShowSceneChoices(true);
        return currentScene;
      }

      return SCENES[currentScene]?.nextScene ?? currentScene;
    });
  }, [selectedSceneChoice]);

  return {
    activeScene,
    scene: SCENES[activeScene],
    showSceneChoices,
    selectedSceneChoice,
    selectedChoice,
    playerName,
    setPlayerName,
    chooseSceneOption,
    goToNextScene,
  };
}

export function SceneScreen({
  activeScene,
  selectedSceneChoice,
  selectedChoice,
  showSceneChoices,
  player,
  playerName,
  onPlayerNameChange,
  onNameSubmit,
  onComplete,
  onChooseSceneOption,
}) {
  const scene = SCENES[activeScene];

  return (
    <View style={styles.sceneContainer}>
      <Image source={scene.image} style={styles.sceneImage} resizeMode="cover" />

      {scene.portrait && (
        <View style={styles.portraitContainer}>
          <Image
            source={scene.portrait}
            style={styles.portraitImage}
            resizeMode="contain"
          />
        </View>
      )}

      <View style={styles.sceneDialogPanel}>
        <DialogBox
          key={`${activeScene}-${selectedSceneChoice ?? "none"}`}
          messages={
            activeScene === "prologue_p1"
              ? selectedChoice
                ? [
                    scene.dialogue[0],
                    selectedChoice.response,
                    ...scene.dialogue.slice(1).map((message) =>
                      message.replace("[name]", player.name)
                    ),
                  ]
                : scene.dialogue.slice(0, 1)
              : scene.dialogue
          }
          initialMessageIndex={
            activeScene === "prologue_p1" && selectedChoice ? 1 : 0
          }
          namePrompt={activeScene === "prologue_p1" && Boolean(selectedChoice)}
          name={playerName}
          onNameChange={onPlayerNameChange}
          onNameSubmit={onNameSubmit}
          onComplete={onComplete}
        />
        {showSceneChoices && (
          <View style={styles.sceneChoices}>
            {SCENE_CHOICES.map((choice) => (
              <Pressable
                key={choice.id}
                style={styles.choiceButton}
                onPress={() => onChooseSceneOption(choice.id)}
              >
                <Text style={styles.choiceText}>{choice.label}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}



export function displayMiniMap() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/buildings/fullMap.png')} 
        style={styles.miniMapImage} 
      />
    </View>
  );
}

// Function to hide the scene screen and show the minimap in full 
export function hideSceneScreen() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      
      {!isMapOpen && (
        <img
          src={require('./assets/buildings/fullMap.png')}
          alt="MiniMap"
          onClick={() => isMapOpen(true)}
          style={{ cursor: 'pointer', borderRadius: '8px' }}
        />
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
  },
  sceneImage: {
    width: "100%",
    height: "100%",
  },
  sceneDialogPanel: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: "75%",
    zIndex: 2000,
    elevation: 11,
  },
  sceneChoices: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  choiceButton: {
    flex: 1,
    backgroundColor: "#25384d",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  choiceText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  portraitContainer: {
    position: "absolute",
    left: 20,
    bottom: 20,
    width: "25%",
    height: 220,
    zIndex: 2000,
    elevation: 11,
  },
  portraitImage: {
    width: "100%",
    height: "100%",
  },
  miniMapImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    left: 10,
    top: 10,
  },
});
