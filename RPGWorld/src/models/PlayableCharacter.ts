
import { Player } from "./player";

export class PlayableCharacter extends Player {
    x: number;
    y: number;
    speed: number;

    constructor(
        name: string,
        health: number,
        level: number,
        attackPower: number,
        username: string,
        x: number = 400,
        y: number = 300
    ) {
        super(name, health, level, attackPower, username);

        this.x = x;
        this.y = y;
        this.speed = 20;
    }

    moveUp(): void {
        this.y -= this.speed;
    }

    moveDown(): void {
        this.y += this.speed;
    }

    moveLeft(): void {
        this.x -= this.speed;
    }

    moveRight(): void {
        this.x += this.speed;
    }

    move(direction: string): void {
        switch (direction) {
            case "up":
                this.moveUp();
                break;
            case "down":
                this.moveDown();
                break;
            case "left":
                this.moveLeft();
                break;
            case "right":
                this.moveRight();
                break;
        }
    }
}
