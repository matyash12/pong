import calculateBallPositionComponent from "./calculateBallPositionComponent.mjs";
import calculatePlayerPositionComponent from "./calculatePlayerPositionComponent.mjs";

function physics(physicsData) {
    physicsData.firstPlayerPos = calculatePlayerPositionComponent(physicsData.firstPlayerPos, physicsData.firstPlayerMove);
    physicsData.secondPlayerPos = calculatePlayerPositionComponent(physicsData.secondPlayerPos, physicsData.secondPlayerMove)

    var ballData = calculateBallPositionComponent(physicsData.ballLeftPos, physicsData.ballTopPos, physicsData.ballLeftMovementSpeed, physicsData.ballTopMovementSpeed, physicsData.firstPlayerPos, physicsData.secondPlayerPos);

    physicsData.ballLeftPos = ballData.ballLeftPosition;
    physicsData.ballTopPos = ballData.ballTopPosition;
    physicsData.ballLeftMovementSpeed = ballData.ballLeftMovementSpeed;
    physicsData.ballTopMovementSpeed = ballData.ballTopMovementSpeed;

    return physicsData;
}

export default physics;