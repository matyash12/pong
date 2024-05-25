function calculatePlayerCollisionComponent(ballTopMidPosition, ballLeftMidPosition, firstPlayerPos, playerTopSize, playerLeftMinPosition, playerLeftMaxPosition) {
    const playerTopMinPosition = firstPlayerPos;
    const playerTopMaxPosition = firstPlayerPos + playerTopSize;
    
    if (ballTopMidPosition > playerTopMinPosition && ballTopMidPosition < playerTopMaxPosition
        && ballLeftMidPosition > playerLeftMinPosition && ballLeftMidPosition < playerLeftMaxPosition
    ) {
        console.log("Player is playing the ball");
        return true;
        //player is "playing" the ball

    }
    return false;
}
export default calculatePlayerCollisionComponent;