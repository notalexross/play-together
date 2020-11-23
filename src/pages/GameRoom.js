import React from 'react'
import RoomRedirect from '../helpers/RoomRedirect'
import { Container } from '../components'
import HeaderContainer from '../containers/header'
import RoomContainer from '../containers/room'

export default function GameRoom() {
  return (
    <RoomRedirect>
      <Container direction="column">
        <HeaderContainer />
        <RoomContainer />
      </Container>
    </RoomRedirect>
  )
}