import React, { useContext } from 'react'
// import { windowContext } from '../context/window'
import RoomRedirect from '../helpers/RoomRedirect'
import { Container } from '../components'
import HeaderContainer from '../containers/header'
import RoomContainer from '../containers/room'
import { SettingsContextProvider } from '../context/settings'

export default function GameRoom() {
  // const { windowHeight } = useContext(windowContext) // this will force a rerender of container when page is resized, so container height is correct

  // console.log(windowHeight)

  return (
    <RoomRedirect>
      <SettingsContextProvider>
        <Container direction="column" >
          <HeaderContainer />
          <RoomContainer />
        </Container>
      </SettingsContextProvider>
    </RoomRedirect>
  )
}