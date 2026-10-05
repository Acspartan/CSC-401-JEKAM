import PlayerRenderer from "../renderers/PlayerRenderer";

export default function Player() {
  return {
    position: [150, 250],

    velocity: [0, 0],

    speed: 5,

    renderer: <PlayerRenderer />
  };
}