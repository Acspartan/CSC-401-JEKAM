import { Character } from "./character";

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
    }

    levelUp(): void {
        this.level++;
        this.health += 10;
        this.attackPower += 5;
    }
}