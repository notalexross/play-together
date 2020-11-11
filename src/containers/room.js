import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Room, Table, Player, EmptySeat, Action, GameSelect, Chat, Accordion } from '../components'
import { gameContext } from '../context/game'

export default function RoomContainer() {
  const { sitDown } = useContext(gameContext)

  // TODO
  const players = [{id: 1111, name: 'barry', hand: [1,2], stats: {played: 5, wins: 2}}, {id: 2222, name: 'larry', hand: [3,4], stats: {played: 5, wins: 3}}]
  const messages = [
    {id: 1, user: 'bob', color: '#d46d00', timestamp: '5:03', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ullamcorper lacus, id congue tellus.'},
    {id: 2, user: 'billy', color: '#1e90ff', timestamp: '5:05', message: 'Nam et finibus odio. Vivamus ac elit ac nisi eleifend efficitur et a neque.'},
    {id: 3, user: 'bob', color: '#d46d00', timestamp: '5:08', message: 'Nullam venenatis turpis ut enim tincidunt pharetra. Vestibulum at sem commodo nisi luctus eleifend.'},
    {id: 4, user: 'bob', color: '#d46d00', timestamp: '5:10', message: 'Integer tincidunt justo eros, ut luctus est venenatis vel.'},
    {id: 5, user: 'billy', color: '#1e90ff', timestamp: '5:15', message: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'},
  ]

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
        {/* <Table>
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
        </Table> */}
      </Room.Panel>
      <Room.Panel>
        <Chat>
          <Chat.Form>
            <Chat.TextInput />
            <Chat.Send>Send</Chat.Send>
          </Chat.Form>
          <Chat.Log>
            {messages.map(message => (
              <Chat.Message key={message.id}>
                <Chat.Timestamp>{message.timestamp}</Chat.Timestamp>
                <Chat.Sender color={message.color}>{message.user}</Chat.Sender>
                <Chat.Text>{message.message}</Chat.Text>
              </Chat.Message>
            ))}
          </Chat.Log>
        </Chat>
      </Room.Panel>
    </Room>
  )
}