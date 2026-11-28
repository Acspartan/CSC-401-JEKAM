import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import QuestWindow, { initialQuests } from "./components/QuestWindow";
import buildings from "./data/buildings";
import { isPlayerAtBuilding } from "./systems/buildingCollision";
import { updateQuestProgress } from "./systems/questTracker";

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

export function useQuestFlow(player, awardExperience) {
  const [quests, setQuests] = useState(createInitialQuests);
  const [questOpen, setQuestOpen] = useState(false);
  const previousPosition = useRef({ x: player.x, y: player.y });
  const visitedBuildings = useRef(new Set());
  const claimedXpRewards = useRef(new Set());

  useEffect(() => {
    const previous = previousPosition.current;
    const completedActions = [];

    if (player.x > previous.x) completedActions.push("east");
    if (player.x < previous.x) completedActions.push("west");
    if (player.y > previous.y) completedActions.push("south");
    if (player.y < previous.y) completedActions.push("north");

    previousPosition.current = { x: player.x, y: player.y };

    if (completedActions.length > 0) {
      completedActions.push("campus");
      setQuests((previousQuests) =>
        completedActions.reduce(
          (currentQuests, objectiveId) =>
            updateQuestProgress(currentQuests, objectiveId),
          previousQuests
        )
      );
    }
  }, [player.x, player.y]);

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
          (currentQuests, objectiveId) =>
            updateQuestProgress(currentQuests, objectiveId),
          previousQuests
        )
      );
    }
  }, [player.x, player.y]);

  useEffect(() => {
    const newlyCompletedXpQuests = quests.filter((quest) => {
      if (!quest.completed || claimedXpRewards.current.has(quest.id)) {
        return false;
      }

      const xpReward = String(quest.reward).match(/(\d+)\s*XP/i);
      if (!xpReward) return false;

      claimedXpRewards.current.add(quest.id);
      return true;
    });

    const xpToAward = newlyCompletedXpQuests.reduce((total, quest) => {
      const xpReward = String(quest.reward).match(/(\d+)\s*XP/i);
      return total + (xpReward ? Number(xpReward[1]) : 0);
    }, 0);

    if (xpToAward > 0) {
      awardExperience(xpToAward);
    }
  }, [quests, awardExperience]);

  return {
    quests,
    questOpen,
    toggleQuestWindow: () => setQuestOpen((previous) => !previous),
  };
}

export function QuestHUD({ player, quests, questOpen, onToggle }) {
  return (
    <>
      {questOpen && (
        <View style={styles.questPanel}>
          <QuestWindow player={player} quests={quests} />
        </View>
      )}

      <Pressable style={styles.questButton} onPress={onToggle}>
        <Text style={styles.questButtonText}>
          {questOpen ? "Close Quests" : "Quests"}
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  questPanel: {
    position: "absolute",
    bottom: 90,
    left: 20,
    width: 300,
    height: 520,
    zIndex: 1500,
    elevation: 10,
  },
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
});
