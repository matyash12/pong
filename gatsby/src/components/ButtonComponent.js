import * as React from "react"


function ButtonComponent({text, onClick}) {
    return <button style={{width:"100%", height:"100px"}} onClick={onClick}>{text}</button>
}

export default ButtonComponent;