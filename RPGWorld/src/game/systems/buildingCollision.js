export function isPlayerAtBuilding(player, building) {
    const PLAYER_WIDTH = 40;
    const PLAYER_HEIGHT = 48;

    return (
        player.x < building.position.x + building.size.width &&
        player.x + PLAYER_WIDTH > building.position.x &&
        player.y < building.position.y + building.size.height &&
        player.y + PLAYER_HEIGHT > building.position.y
    );
}