import React from 'react'
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
        <SettingsContextProvider>
          <LocalSettingsContextProvider>
            <GameContextProvider>
              <Container direction="column">
                <HeaderContainer />
                <RoomContainer />
              </Container>
            </GameContextProvider>
          </LocalSettingsContextProvider>
        </SettingsContextProvider>
      </PresenceContextProvider>
    </RoomRedirect>
  )
}
