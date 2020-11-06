import React, { useContext } from "react"
import { useParams, Link } from "react-router-dom"
import "../styles/GameRoom.css"
import * as ROUTES from "../constants/routes"
import { GameContextProvider } from "../context/gameContext.js"
import { userContext } from "../context/userContext.js"
import RoomRedirect from "../components/RoomRedirect.js"
import HomeLink from "../components/HomeLink.js"
import Seat from "../components/Seat.js"
import ChangeNicknameButton from "../components/ChangeNicknameButton.js"

export default function() {
  const { roomId } = useParams()
  const { nickname } = useContext(userContext)

  return (
    <RoomRedirect>
      <GameContextProvider>
        <Link to={ROUTES.HOME}>
          <button>Home</button>
        </Link>
        <p>nickname: {nickname} <ChangeNicknameButton/></p>
        <p>roomId: {roomId}</p>
        <br/>
        <Seat />
        <Seat />
        <Seat />
      </GameContextProvider>
    </RoomRedirect>
  )
}
