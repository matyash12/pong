function calculateBallHitPlayerComponent(playerPos, ballTopMidPosition, playerTopSize, ballTopMovementMaxSpeed){
    const playerTopMinPosition = playerPos;

    var ballTopMovementSpeed = ((ballTopMidPosition - playerTopMinPosition) - playerTopSize / 2) / 50 * ballTopMovementMaxSpeed;
    return ballTopMovementSpeed;
}
export default calculateBallHitPlayerComponent;