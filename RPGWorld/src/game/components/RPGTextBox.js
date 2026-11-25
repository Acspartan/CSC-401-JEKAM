import React from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
} from "react-native";

export default function RPGTextBox({
                                       visible,
                                       speaker,
                                       text,
                                       choices = [],
                                       input,
                                       onNext,
                                       nextLabel = "Continue",
                                   }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={() => {}}
        >
            <View style={styles.overlay}>

                <View style={styles.box}>

                    {/* CHARACTER NAME */}
                    <Text style={styles.speaker}>
                        {speaker}
                    </Text>

                    {/* CHARACTER DIALOGUE */}
                    <Text style={styles.text}>
                        {text}
                    </Text>

                    {/* PLAYER TEXT INPUT */}
                    {input && (
                        <TextInput
                            style={styles.input}
                            value={input.value}
                            onChangeText={input.onChange}
                            placeholder={input.placeholder}
                            placeholderTextColor="#AAAAAA"
                        />
                    )}

                    {/* PLAYER DIALOGUE CHOICES */}
                    {choices.map((choice) => (
                        <Pressable
                            key={choice.label}
                            style={styles.button}
                            onPress={choice.onPress}
                        >
                            <Text style={styles.buttonText}>
                                {choice.label}
                            </Text>
                        </Pressable>
                    ))}

                    {/* CONTINUE BUTTON */}
                    {choices.length === 0 && (
                        <Pressable
                            disabled={
                                input && !input.value.trim()
                            }
                            style={[
                                styles.button,
                                input &&
                                !input.value.trim() &&
                                styles.disabledButton,
                            ]}
                            onPress={onNext}
                        >
                            <Text style={styles.buttonText}>
                                {nextLabel} ▶
                            </Text>
                        </Pressable>
                    )}

                </View>

            </View>
        </Modal>
    );
}

// DIALOGUE BOX STYLING
const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 24,
    },

    box: {
        width: "100%",
        maxWidth: 760,
        backgroundColor: "#292929",
        borderColor: "#c6a15b",
        borderWidth: 3,
        borderRadius: 8,
        padding: 20,
    },

    speaker: {
        color: "#f4d58d",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
    },

    text: {
        color: "#FFFFFF",
        fontSize: 17,
        lineHeight: 25,
        marginBottom: 16,
    },

    input: {
        color: "#FFFFFF",
        backgroundColor: "#202020",
        borderWidth: 1,
        borderColor: "#AAAAAA",
        borderRadius: 4,
        padding: 10,
        marginBottom: 12,
        fontSize: 16,
    },

    button: {
        backgroundColor: "#51432c",
        borderColor: "#c6a15b",
        borderWidth: 1,
        padding: 12,
        marginTop: 8,
        borderRadius: 4,
    },

    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },

    disabledButton: {
        opacity: 0.4,
    },

});