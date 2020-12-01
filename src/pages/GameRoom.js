import React, { useContext } from 'react'
// import { windowContext } from '../context/window'
import RoomRedirect from '../helpers/RoomRedirect'
import { Container } from '../components'
import HeaderContainer from '../containers/header'
import RoomContainer from '../containers/room'
import { SettingsContextProvider } from '../context/settings'
import { LocalSettingsContextProvider } from '../context/local-settings'
import { GameContextProvider } from '../context/game'
import { PresenceContextProvider } from '../context/presence'

export default function GameRoom() {
  return (
    <RoomRedirect>
      <PresenceContextProvider>
        <LocalSettingsContextProvider>
          <SettingsContextProvider>
            <GameContextProvider>
              <Container direction="column" >
                <HeaderContainer />
                <RoomContainer />
              </Container>
            </GameContextProvider>
          </SettingsContextProvider>
        </LocalSettingsContextProvider>
      </PresenceContextProvider>
    </RoomRedirect>
  )
}