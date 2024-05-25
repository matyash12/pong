import * as React from "react"

import ButtonComponent from "./ButtonComponent";

function ButtonsComponent({upOnClick, downOnClick}){
    return <div>
        <ButtonComponent text="Up" onClick={upOnClick}></ButtonComponent>
        <ButtonComponent text="Down" onClick={downOnClick}></ButtonComponent>
    </div>
}

export default ButtonsComponent;