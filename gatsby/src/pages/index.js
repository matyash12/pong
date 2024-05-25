import * as React from "react"
import GameViewComponent from "../components/GameViewComponent"


const IndexPage = () => {



  return (
    <div>
      <h1>Hello world!</h1>
      <GameViewComponent></GameViewComponent>
    </div>
  )
}

export default IndexPage

export const Head = () => <title>Ping-Pong</title>
