import React from "react";

function StartInComponent({ startIn }) {
    return (
        startIn.startIn != 0 ? (
            <h1 style={{ position: "absolute", top: "0%", left: "50%", color: "white" }}>
                {Math.floor(startIn / 1000)}
            </h1>
        ) : (
            <div></div>
        )
    );
}

export default StartInComponent;
