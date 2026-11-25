import React, { useState, useEffect } from "react";
import RPGTextBox from "./RPGTextBox";

export default function StoryQuest({ quests = [] }) {

    // STORY DIALOGUE STATE
    const [step, setStep] = useState(0);
    const [playerName, setPlayerName] = useState("");
    const [nervous, setNervous] = useState(false);
    const [visible, setVisible] = useState(true);
    const [introCompleted, setIntroCompleted] = useState(false);
    const [endingShown, setEndingShown] = useState(false);

    // FIND THE STORY QUEST FROM QUEST WINDOW
    const storyQuest = quests.find(
        (quest) => quest.id === 5
    );

    // MOVE TO THE NEXT DIALOGUE
    const nextStep = () => {
        setStep((previousStep) => previousStep + 1);
    };

    // ACCEPT THE STORY QUEST
    const acceptQuest = () => {
        setIntroCompleted(true);
        setVisible(false);
    };

    // CHECK WHETHER THE STORY QUEST IS COMPLETED
    useEffect(() => {

        if (
            storyQuest?.completed &&
            introCompleted &&
            !endingShown
        ) {
            setStep(100);
            setVisible(true);
            setEndingShown(true);
        }

    }, [
        storyQuest?.completed,
        introCompleted,
        endingShown,
    ]);

    // STORY DIALOGUE
    const dialogue = {

        // INTRODUCTION
        0: {
            speaker: "Captain Redbeard",

            text:
                "Ahoy, matey! I'm Captain Redbeard! " +
                "I'll be your mentor on this journey. " +
                "Are ye ready to become the greatest pirate " +
                "to ever sail away from home?",

            choices: [
                {
                    label: "Yes! I am excited!",
                    onPress: () => {
                        setNervous(false);
                        setStep(1);
                    },
                },
                {
                    label: "I'm nervous.",
                    onPress: () => {
                        setNervous(true);
                        setStep(1);
                    },
                },
            ],
        },

        // ASK FOR PLAYER NAME
        1: {
            speaker: "Captain Redbeard",

            text: nervous
                ? "That's okay, matey! We'll guide our sails " +
                "toward some resources that can help ease " +
                "your mind. But first, what's your name?"
                : "Great! The sea is vast and wide with so " +
                "much to do. Let's get ye started! " +
                "First, tell me your name.",

            input: {
                value: playerName,
                onChange: setPlayerName,
                placeholder: "Enter your name",
            },

            onNext: nextStep,
        },

        // WELCOME PLAYER
        2: {
            speaker: "Captain Redbeard",

            text:
                `That's a fine name indeed, ${playerName}! ` +
                "Welcome aboard, matey! I'll be helping ye " +
                "navigate your first semester on campus.",

            onNext: nextStep,
        },

        // INTRODUCE CAMPUS
        3: {
            speaker: "Captain Redbeard",

            text:
                "Your studies are important, but there is " +
                "more to life than your books! Make sure " +
                "ye explore the campus, meet new people, " +
                "and discover what resources are available.",

            onNext: nextStep,
        },

        // DOCKING
        4: {
            speaker: "Captain Redbeard",

            text:
                "LAND HO! We've finally reached our destination! " +
                "Welcome to the University of Tampa, matey!",

            onNext: nextStep,
        },

        // INTRODUCE QUEST WINDOW
        5: {
            speaker: "Captain Redbeard",

            text:
                "Every great pirate needs a quest! " +
                "Open your Quest Log and select the Story tab. " +
                "There you'll find your first adventure: " +
                "The Pirate's Voyage.",

            onNext: nextStep,
        },

        // EXPLAIN OBJECTIVES
        6: {
            speaker: "Captain Redbeard",

            text:
                "Your first mission is to explore some important " +
                "locations around campus. Visit Morsani Hall, " +
                "the Health and Technology Building, McKay Hall, " +
                "the Health and Wellness Center, and Vaughn Center.",

            onNext: nextStep,
        },

        // WORKDAY TIP
        7: {
            speaker: "Captain Redbeard",

            text:
                "Here's a tip from your captain! Use Workday " +
                "to check your class schedule and find out " +
                "where your classes are located. " +
                "A prepared pirate is a successful pirate!",

            onNext: nextStep,
        },

        // CONDITIONAL WELLNESS DIALOGUE
        8: {
            speaker: "Captain Redbeard",

            text: nervous
                ? "Remember, matey, ye don't have to face " +
                "everything alone. The Health and Wellness " +
                "Center can help connect ye with resources " +
                "and support."
                : "Don't forget to take care of yourself, matey! " +
                "The Health and Wellness Center is an important " +
                "resource for every student.",

            onNext: nextStep,
        },

        // ACCEPT QUEST
        9: {
            speaker: "Captain Redbeard",

            text:
                `Now then, ${playerName}, it's time to begin ` +
                "your adventure! Complete the objectives in " +
                "your Story Quest Log and earn your reward. " +
                "Fair winds, matey!",

            nextLabel: "Accept Quest",

            onNext: acceptQuest,
        },

        // QUEST COMPLETION
        100: {
            speaker: "Captain Redbeard",

            text:
                `Shiver me timbers, ${playerName}! ` +
                "Ye completed your first story quest! " +
                "You've proven yourself to be a fine member " +
                "of my crew.",

            onNext: nextStep,
        },

        // REWARD DIALOGUE
        101: {
            speaker: "Captain Redbeard",

            text:
                "The Pirate's Voyage is complete! " +
                `Quest reward: ${storyQuest?.reward ?? "200 XP"}. ` +
                "Keep exploring, completing quests, " +
                "and growing stronger!",

            onNext: nextStep,
        },

        // END OF STORY CHAPTER
        102: {
            speaker: "Captain Redbeard",

            text:
                "Your adventure has only just begun. " +
                "There are plenty more treasures, friendships, " +
                "and opportunities waiting for ye. " +
                "Until next time, matey!",

            nextLabel: "Finish",

            onNext: () => {
                setVisible(false);
            },
        },
    };

    // GET CURRENT DIALOGUE
    const currentDialogue = dialogue[step];

    // DO NOT DISPLAY INVALID OR HIDDEN DIALOGUE
    if (!visible || !currentDialogue) {
        return null;
    }

    // DISPLAY RPG TEXT BOX
    return (
        <RPGTextBox
            visible={visible}
            speaker={currentDialogue.speaker}
            text={currentDialogue.text}
            choices={currentDialogue.choices ?? []}
            input={currentDialogue.input}
            onNext={currentDialogue.onNext}
            nextLabel={
                currentDialogue.nextLabel ?? "Continue"
            }
        />
    );
}