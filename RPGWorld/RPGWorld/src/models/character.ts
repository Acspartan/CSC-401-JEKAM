export class Character {
    name: string;
    health: number;
    level: number;
    attackPower: number;

    constructor(
        name: string,
        health: number,
        level: number,
        attackPower: number
    ) {
        this.name = name;
        this.health = health;
        this.level = level;
        this.attackPower = attackPower;
    }

    attack(target: Character): void {
        console.log(
            `${this.name} attacks ${target.name} for ${this.attackPower} damage!`
        );

        target.takeDamage(this.attackPower);
    }

    takeDamage(damage: number): void {
        this.health -= damage;

        if (this.health < 0) {
            this.health = 0;
        }
    }

    isAlive(): boolean {
        return this.health > 0;
    }
}