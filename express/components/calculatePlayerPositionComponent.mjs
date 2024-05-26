
const playerMovementSpeed = 8;


const minPlayerBarrier = 0;
const maxPlayerBarrier = 400;

function calculatePlayerPositionComponent(playerPos, playerMove) {
  if (playerMove == "up") {
    playerPos -= playerMovementSpeed;
    if (minPlayerBarrier > playerPos) {
      playerPos = minPlayerBarrier;
    }
  }
  if (playerMove == "down") {
    playerPos += playerMovementSpeed;
    if (maxPlayerBarrier < playerPos) {
      playerPos = maxPlayerBarrier;
    }
  }

  return playerPos
}
export default calculatePlayerPositionComponent;