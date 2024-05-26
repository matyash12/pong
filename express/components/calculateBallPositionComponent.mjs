import calculateBallHitPlayerComponent from "./calculateBallHitPlayerComponent.mjs";
import calculatePlayerCollisionComponent from "./calculatePlayerCollisionComponent.mjs";

const ballLeftSize = 20;
const ballTopSize = 20;

const playerTopSize = 100;
const playerLeftSize = 50;

const ballTopMovementMaxSpeed = 5;

function calculateBallPositionComponent(ballLeftPosition, ballTopPosition, ballLeftMovementSpeed,
    ballTopMovementSpeed, firstPlayerPos, secondPlayerPos, onBallLeftSideHit, onBallRightSideHit) {

    ballLeftPosition = ballLeftPosition + ballLeftMovementSpeed;

    const ballLeftMidPosition = ballLeftPosition + ballLeftSize / 2;
    const ballTopMidPosition = ballTopPosition + ballTopSize / 2;

    //ball hit right side
    if (ballLeftMidPosition > 1000 - ballLeftSize / 2) {
        ballLeftMovementSpeed = -5;
        ballTopMovementSpeed = 0;
        onBallRightSideHit();
    }

    //ball hit left side
    if (ballLeftMidPosition < 0 + ballLeftSize / 2) {
        ballLeftMovementSpeed = 5;
        ballTopMovementSpeed = 0;
        onBallLeftSideHit();
    }
    if (ballTopMidPosition > 500 - ballTopSize / 2 && ballTopMovementSpeed > 0) {
        ballTopMovementSpeed = -ballTopMovementSpeed;
    }
    if (ballTopMidPosition < 0 + ballTopSize / 2 && ballTopMovementSpeed < 0) {
        ballTopMovementSpeed = -ballTopMovementSpeed;
    }


    //left side player
    if (calculatePlayerCollisionComponent(ballTopMidPosition, ballLeftMidPosition, firstPlayerPos, playerTopSize, 0, playerLeftSize)) {
        console.log("LeftPlayer is playing the ball");
        //player is "playing" the ball
        ballTopMovementSpeed = calculateBallHitPlayerComponent(firstPlayerPos, ballTopMidPosition, playerTopSize, ballTopMovementMaxSpeed)
        ballLeftMovementSpeed = 5;
    }

    //right side player
    if (calculatePlayerCollisionComponent(ballTopMidPosition, ballLeftMidPosition, secondPlayerPos, playerTopSize, 1000 - playerLeftSize, 1000)) {
        console.log("RightPlayer is playing the ball");
        //player is "playing" the ball
        //ballTopMovementMaxSpeed is reversed because the player is playing on the other side
        ballTopMovementSpeed = calculateBallHitPlayerComponent(secondPlayerPos, ballTopMidPosition, playerTopSize, ballTopMovementMaxSpeed)
        ballLeftMovementSpeed = -5
    }

    return {
        ballLeftPosition: ballLeftPosition,
        ballTopPosition: ballTopPosition + ballTopMovementSpeed,
        ballLeftMovementSpeed: ballLeftMovementSpeed,
        ballTopMovementSpeed: ballTopMovementSpeed
    }
}

export default calculateBallPositionComponent;