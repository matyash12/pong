import React from 'react';
import StartInComponent from "./StartInComponent";

function PlayFieldComponent({leftPlayerPos, rightPlayerPos, ballLeftPos, ballTopPos, startIn}) {

    return <div style={{backgroundColor:'black', width:'1000px', height:'500px', position:'relative'}}>
        <StartInComponent startIn={startIn}></StartInComponent>
        <div style={{backgroundColor:'red', width:'50px',height:'100px', position:'absolute', left:'0px', top:leftPlayerPos}}></div>
        <div style={{backgroundColor:'yellow', width:'50px',height:'100px', position:'absolute', right:'0px', top:rightPlayerPos}}></div>
        <div style={{backgroundColor:'green', width:'25px', height:'25px', position:'absolute', left:ballLeftPos,top:ballTopPos}}></div>
    </div>;
};

export default PlayFieldComponent;
