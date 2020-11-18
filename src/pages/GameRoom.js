import React, { useRef } from 'react'
import { GameContextProvider } from '../context/game'
import RoomRedirect from '../helpers/RoomRedirect'
import { Container } from '../components'
import HeaderContainer from '../containers/header'
import RoomContainer from '../containers/room'

export default function GameRoom() {
  const pageHeaderRef = useRef()

  return (
    <RoomRedirect>
      <GameContextProvider>
        <Container direction="column">
          <HeaderContainer />
          <RoomContainer />
        </Container>
      </GameContextProvider>
    </RoomRedirect>
  )
}