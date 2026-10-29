// Updates quest objectives when the player completes an action.
// Works with building visits, movement, and campus entry.

export function updateQuestProgress(quests, objectiveId) {
    return quests.map((quest) => {
        // Skip quests that are already completed
        if (quest.completed) {
            return quest;
        }

        let changed = false;

        const objectives = quest.objectives.map((objective) => {
            // Ignore invalid objectives
            if (
                objective === null ||
                typeof objective !== "object" ||
                objective.completed
            ) {
                return objective;
            }

            // Check whether the player's action matches the objective
            if (objective.id !== objectiveId) {
                return objective;
            }

            changed = true;

            return {
                ...objective,
                completed: true,
            };
        });

        // Do not update quests without matching objectives
        if (!changed) {
            return quest;
        }

        // Check whether every objective is completed
        const completed = objectives.every(
            (objective) =>
                objective !== null &&
                typeof objective === "object" &&
                objective.completed === true
        );

        return {
            ...quest,
            objectives,
            completed,
            status: completed ? "completed" : "in_progress",
        };
    });
}