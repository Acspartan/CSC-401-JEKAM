// MovementSystem.js

export default function MovementSystem(entities) {
  const player = entities.player;

  if (!player || !Array.isArray(player.position)) {
    return entities;
  }

  // Track the player's previous position
  const previousPosition = player.previousPosition
      ? [...player.previousPosition]
      : [...player.position];

  const currentPosition = [...player.position];

  const dx = currentPosition[0] - previousPosition[0];
  const dy = currentPosition[1] - previousPosition[1];

  // Detect movement direction
  let direction = null;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) direction = "east";
    if (dx < 0) direction = "west";
  } else {
    if (dy > 0) direction = "south";
    if (dy < 0) direction = "north";
  }

  // Update quest progress when the player moves
  if (direction && typeof entities.onQuestProgress === "function") {
    entities.onQuestProgress(direction);
  }

  // Save position for the next update
  player.previousPosition = [...currentPosition];

  return entities;
}