
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PlayableCharacter({ x, y }) {
    return (
        <View
            pointerEvents="none"
            style={[
                styles.player,
                {
                    left: x,
                    top: y,
                },
            ]}
        >
            <Text style={styles.avatar}>🧍</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    player: {
        position: "absolute",
        width: 40,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },

    avatar: {
        fontSize: 32,
    },
});
