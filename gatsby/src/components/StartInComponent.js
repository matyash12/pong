import React from "react";

function StartInComponent({ startIn }) {
    return (
        startIn != 0 ? (
            <h1 style={{ position: "absolute", top: "0%", left: "49%", color: "white", fontSize:"50px", fontWeight:"bolder" }}>
                {Math.floor(startIn / 1000)}
            </h1>
        ) : (
            <div></div>
        )
    );
}

export default StartInComponent;
