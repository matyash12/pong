import * as React from "react"

import ButtonComponent from "./ButtonComponent";

function JoinComponent({upOnClick, downOnClick}){
    return <div>
        <ButtonComponent text="Join" onClick={downOnClick}></ButtonComponent>
    </div>
}

export default JoinComponent;