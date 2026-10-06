import { Character } from "./Character";

export class NPC extends Character {
    npcType: string;

    constructor(
        name: string,
        health: number,
        level: number,
        attackPower: number,
        npcType: string
    ) {
        super(name, health, level, attackPower);

        this.npcType = npcType;
    }

    interact(): string {
        if (this.npcType === "Merchant") {
            return "Welcome! Would you like to buy something?";
        }

        if (this.npcType === "Trainer") {
            return "I can help improve your abilities.";
        }

        if (this.npcType === "Boss") {
            return "You will not defeat me!";
        }

        return `${this.name} has nothing to say.`;
    }
}