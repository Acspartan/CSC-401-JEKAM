import React from "react";

import {
  View,
  ScrollView,
  StyleSheet,
} from "react-native";

//code from: https://codeworkshop.dev/doc/2020-03-01-creating-an-rpg-dialog-effect-with-react-and-react-spring
import DialogBox from "./components/DialogBox";


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
import { PlayerControls, usePlayerFlow } from "./PlayerFlow";

// Campus dimensions
const WORLD_WIDTH = 2100;
const WORLD_HEIGHT = 1250;

export default function GameWorld() {
  const sceneFlow = useSceneFlow();
  const playerFlow = usePlayerFlow({ worldWidth: WORLD_WIDTH, worldHeight: WORLD_HEIGHT });
  const { player, movePlayer } = playerFlow;
  const questFlow = useQuestFlow(player, playerFlow.awardExperience);

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
            onNameSubmit={playerFlow.savePlayerName}
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

            

            <PlayerControls onMove={movePlayer} />

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

});
