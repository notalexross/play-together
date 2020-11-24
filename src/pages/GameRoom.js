import React, { useContext } from 'react'
import { windowContext } from '../context/window'
import RoomRedirect from '../helpers/RoomRedirect'
import { Container } from '../components'
import HeaderContainer from '../containers/header'
import RoomContainer from '../containers/room'

export default function GameRoom() {
  const { windowHeight } = useContext(windowContext) // this will force a rerender of container when page is resized, so container height is correct

  return (
    <RoomRedirect>
      <Container direction="column" height={`${windowHeight}px`}>
        <HeaderContainer />
        <RoomContainer />
      </Container>
    </RoomRedirect>
  )
}