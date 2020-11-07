import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { GameContextProvider } from '../context/gameContext'
import { userContext } from '../context/userContext'
import RoomRedirect from '../helpers/RoomRedirect'
import { Seat } from '../components'
import ChangeNicknameButton from '../containers/ChangeNicknameButton'

export default function() {
  const { roomId } = useParams()
  const { nickname } = useContext(userContext)

  return (
    <RoomRedirect>
      <GameContextProvider>
        <Link to={ROUTES.HOME}>
          <button>Home</button>
        </Link>
        <p>nickname: {nickname}</p> <ChangeNicknameButton/>
        <p>roomId: {roomId}</p>
        <br/>
        <Seat />
        <Seat />
        <Seat />
      </GameContextProvider>
    </RoomRedirect>
  )
}
