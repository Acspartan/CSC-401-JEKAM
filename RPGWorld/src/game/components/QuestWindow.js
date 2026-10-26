import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    ScrollView,
    StyleSheet,
} from "react-native";

// Starting quests
export const initialQuests = [
    {
        id: 4,
        title: "Getting to Know the Game",
        description:
            "Explore the campus by visiting three important buildings.",
        objectives: [
            {
                id: "mackay",
                text: "Walk to McKay Hall",
                completed: false,
            },
            {
                id: "morsani",
                text: "Walk to Morsani Hall",
                completed: false,
            },
            {
                id: "jenkins",
                text: "Walk to Jenkins Health and Technology Building",
                completed: false,
            },
        ],
        reward: "Level up once",
        completed: false,
        status: "in_progress",
    },

    {
        id: 1,
        title: "Explore Campus",
        description: "Visit three important campus locations.",
        objectives: [
            "Visit Straz Hall",
            "Visit Pepin Stadium",
            "Visit Macdonald-Kelce Library",
        ],
        reward: "100 XP",
        completed: false,
        status: "in_progress",
    },

    {
        id: 2,
        title: "First Steps",
        description: "Learn how to move around the campus.",
        objectives: [
            "Move north",
            "Move south",
            "Move east",
            "Move west",
        ],
        reward: "50 XP",
        completed: false,
        status: "in_progress",
    },

    {
        id: 3,
        title: "Welcome to Campus",
        description: "Begin your journey as a new student.",
        objectives: ["Enter the campus"],
        reward: "25 XP",
        completed: true,
    },
];

export default function QuestWindow({
                                        player,
                                        quests = initialQuests,
                                    }) {
    // Controls which quest tab is displayed
    const [selectedTab, setSelectedTab] = useState("Active");

    // Separate active and completed quests
    const visibleQuests = quests.filter((quest) =>
        selectedTab === "Completed"
            ? quest.completed
            : !quest.completed
    );

    return (
        <View style={styles.window}>

            {/* CHARACTER STATUS PANEL */}
            <View style={styles.statusPanel}>

                <Text style={styles.statusTitle}>
                    CHARACTER STATUS
                </Text>

                <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Name</Text>
                    <Text style={styles.statusValue}>
                        {player?.name ?? "Hero"}
                    </Text>
                </View>

                <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Level</Text>
                    <Text style={styles.statusValue}>
                        {player?.level ?? 1}
                    </Text>
                </View>

                <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Health</Text>
                    <Text style={styles.healthValue}>
                        {player?.health ?? 100} HP
                    </Text>
                </View>

                <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Attack</Text>
                    <Text style={styles.statusValue}>
                        {player?.attackPower ?? 10}
                    </Text>
                </View>

                <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>
                        Experience
                    </Text>
                    <Text style={styles.experienceValue}>
                        {player?.experience ?? 0} XP
                    </Text>
                </View>

            </View>

            {/* QUEST LOG HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    QUEST LOG
                </Text>
            </View>

            {/* QUEST TABS */}
            <View style={styles.tabs}>

                {["Active", "Completed"].map((tab) => (
                    <Pressable
                        key={tab}
                        onPress={() => setSelectedTab(tab)}
                        style={[
                            styles.tab,
                            selectedTab === tab && styles.activeTab,
                        ]}
                    >
                        <Text style={styles.tabText}>
                            {tab}
                        </Text>
                    </Pressable>
                ))}

            </View>

            {/* QUEST LIST */}
            <ScrollView
                style={styles.questList}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
            >

                {visibleQuests.length === 0 && (
                    <Text style={styles.emptyMessage}>
                        {selectedTab === "Completed"
                            ? "No completed quests yet."
                            : "No active quests available."}
                    </Text>
                )}

                {visibleQuests.map((quest) => {

                    // Count completed objectives
                    const completedCount = quest.objectives.filter(
                        (objective) =>
                            typeof objective === "object" &&
                            objective !== null
                                ? objective.completed
                                : quest.completed
                    ).length;

                    return (
                        <View
                            key={quest.id}
                            style={styles.questCard}
                        >

                            {/* Quest title */}
                            <Text style={styles.questTitle}>
                                {quest.title}
                            </Text>

                            {/* Quest description */}
                            <Text style={styles.description}>
                                {quest.description}
                            </Text>

                            {/* Quest progress */}
                            <Text style={styles.sectionTitle}>
                                Objectives ({completedCount}/{quest.objectives.length})
                            </Text>

                            {/* Individual objectives */}
                            {quest.objectives.map((objective, index) => {

                                const isObject =
                                    objective !== null &&
                                    typeof objective === "object";

                                const isCompleted = isObject
                                    ? objective.completed
                                    : quest.completed;

                                const objectiveText = isObject
                                    ? objective.text
                                    : objective;

                                return (
                                    <Text
                                        key={isObject ? objective.id : index}
                                        style={[
                                            styles.objective,
                                            isCompleted && styles.completedObjective,
                                        ]}
                                    >
                                        {isCompleted ? "✓" : "□"} {objectiveText}
                                    </Text>
                                );
                            })}

                            {/* Quest reward */}
                            <Text style={styles.reward}>
                                Reward: {quest.reward}
                            </Text>

                            {/* Completed quest message */}
                            {quest.completed && (
                                <Text style={styles.completedText}>
                                    QUEST COMPLETED
                                </Text>
                            )}

                        </View>
                    );
                })}

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({

    window: {
        width: "100%",
        height: "100%",
        backgroundColor: "#202020",
        borderWidth: 3,
        borderColor: "#8c8c8c",
        borderRadius: 4,
        padding: 10,
    },

    statusPanel: {
        backgroundColor: "#292929",
        borderWidth: 2,
        borderColor: "#8c8c8c",
        padding: 10,
        marginBottom: 12,
    },

    statusTitle: {
        color: "#f4d58d",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1,
        marginBottom: 10,
    },

    statusRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },

    statusLabel: {
        color: "#CCCCCC",
        fontSize: 13,
    },

    statusValue: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "bold",
    },

    healthValue: {
        color: "#a5e6a5",
        fontSize: 13,
        fontWeight: "bold",
    },

    experienceValue: {
        color: "#f4d58d",
        fontSize: 13,
        fontWeight: "bold",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#666",
        paddingBottom: 12,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 2,
    },

    tabs: {
        flexDirection: "row",
        marginTop: 12,
        marginBottom: 10,
        gap: 4,
    },

    tab: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 4,
        backgroundColor: "#343434",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#666",
    },

    activeTab: {
        backgroundColor: "#646464",
    },

    tabText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "bold",
    },

    questList: {
        flex: 1,
    },

    questCard: {
        backgroundColor: "#303030",
        borderWidth: 1,
        borderColor: "#777",
        padding: 10,
        marginBottom: 12,
    },

    questTitle: {
        color: "#f4d58d",
        fontSize: 17,
        fontWeight: "bold",
    },

    description: {
        color: "#DDDDDD",
        fontSize: 13,
        marginTop: 6,
        marginBottom: 12,
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 6,
    },

    objective: {
        color: "#CCCCCC",
        fontSize: 13,
        marginBottom: 5,
    },

    completedObjective: {
        color: "#a5e6a5",
        textDecorationLine: "line-through",
    },

    reward: {
        color: "#a5e6a5",
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 12,
    },

    completedText: {
        color: "#a5e6a5",
        fontSize: 13,
        fontWeight: "bold",
        marginTop: 10,
    },

    emptyMessage: {
        color: "#AAAAAA",
        fontSize: 14,
        textAlign: "center",
        marginTop: 20,
    },

});