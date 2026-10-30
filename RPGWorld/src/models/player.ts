import { Character } from "./character";

// Cumulative XP required to reach the given level.
export function experienceForLevel(level: number): number {
    return (50 * level * (level + 1)) / 2 - 50;
}

export class Player extends Character {
    username: string;
    experience: number;

    constructor(
        name: string,
        health: number,
        level: number,
        attackPower: number,
        username: string
    ) {
        super(name, health, level, attackPower);

        this.username = username;
        this.experience = 0;
    }

    gainExperience(amount: number): void {
        this.experience += amount;

        while (this.experience >= experienceForLevel(this.level + 1)) {
            this.levelUp();
        }
    }

    levelUp(): void {
        this.level++;
        this.health += 10;
        this.attackPower += 5;
    }
}
