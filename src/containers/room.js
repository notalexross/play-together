import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Room, Table, Player, EmptySeat, Action, GameSelect, Chat, Accordion } from '../components'
import { gameContext } from '../context/game'

export default function RoomContainer() {
  const { sitDown } = useContext(gameContext)

  // TODO
  const players = [{id: 1111, name: 'barry', hand: [1,2], stats: {played: 5, wins: 2}}, {id: 2222, name: 'larry', hand: [3,4], stats: {played: 5, wins: 3}}]

  // what about empty seats when you haven't sat down yet?
  return (
    <Room>
      <Room.Panel>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>Game</Accordion.Header>
            <Accordion.Body>
              <GameSelect>
                <GameSelect.Game>Uno</GameSelect.Game>
                <GameSelect.Game>Chess</GameSelect.Game>
              </GameSelect>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>Game Options</Accordion.Header>
            <Accordion.Body>game options</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>Room Options</Accordion.Header>
            <Accordion.Body>room options</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>Settings</Accordion.Header>
            <Accordion.Body>settings</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Room.Panel>
      <Room.Panel>
        <Table>
          <Table.Board></Table.Board>
          <Table.Seats>
            {players.map(player => (
                <Player key={player.id}>
                  <Player.ProfilePicture/>
                  <Player.Stats>
                    <Player.Wins>{player.stats.wins}</Player.Wins>
                    <Player.Played>{player.stats.played}</Player.Played>
                  </Player.Stats>
                  <Player.Nickname>{player.name}</Player.Nickname>
                  <Player.Hand>
                    {player.hand.map(card => {
                      <Player.Card>{card}</Player.Card>
                    })}
                  </Player.Hand>
                  <Player.Playarea></Player.Playarea>
                </Player>
            ))}
            <EmptySeat onClick={() => sitDown(1234,0)}/>
          </Table.Seats>
          <Table.Actions>
            <Action>Draw</Action>
          </Table.Actions>
        </Table>
      </Room.Panel>
      <Room.Panel>
        <Chat>
          <Chat.Form>
            <Chat.TextInput />
            <Chat.Send>Send</Chat.Send>
          </Chat.Form>
          <Chat.Log></Chat.Log>
        </Chat>
      </Room.Panel>
    </Room>
  )
}