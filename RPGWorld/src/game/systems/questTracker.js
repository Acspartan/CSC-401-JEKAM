export function updateQuestProgress(quests, buildingId) {
    return quests.map((quest) => {
        if (quest.completed) {
            return quest;
        }

        let changed = false;

        const objectives = quest.objectives.map((objective) => {
            if (
                typeof objective !== "object" ||
                objective.id !== buildingId ||
                objective.completed
            ) {
                return objective;
            }

            changed = true;

            return {
                ...objective,
                completed: true,
            };
        });

        if (!changed) {
            return quest;
        }

        const completed = objectives.every(
            (objective) =>
                typeof objective === "object" &&
                objective.completed
        );

        return {
            ...quest,
            objectives,
            completed,
            status: completed ? "completed" : "in_progress",
        };
    });
}