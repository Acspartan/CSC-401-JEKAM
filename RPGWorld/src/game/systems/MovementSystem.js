export default function MovementSystem(entities) {

  const player = entities.player;

  player.position[0] += 1;

  return entities;
}