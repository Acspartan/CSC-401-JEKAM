
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function PlayableCharacter({ x, y }) {
    return (
        <View
            style={[
                styles.player,
                {
                    left: x,
                    top: y,
                    pointerEvents: "none",
                },
            ]}
        >
           <Image
                source={require("../assets/player/piratewalk.gif")}
                style={styles.avatar}
                resizeMode="contain"
/>
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
        width: 40,
        height: 48,
    },
});
