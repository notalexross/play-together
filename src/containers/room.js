import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as ROUTES from '../constants/routes'
import { Room, Table, Player, EmptySeat, Action, GameSelect, Chat } from '../components'
import ChangeNicknameButton from './change-nickname-button'
import { userContext } from '../context/user'
import { gameContext } from '../context/game'

export default function RoomContainer() {
  const { nickname } = useContext(userContext)
  const { sitDown } = useContext(gameContext)
  const { roomId } = useParams()

  // TODO
  const players = [{id: 1111, name: 'barry', hand: [1,2], stats: {played: 5, wins: 2}}, {id: 2222, name: 'larry', hand: [3,4], stats: {played: 5, wins: 3}}]

  // what about empty seats when you haven't sat down yet?
  return (
    <Room>
      <Room.HomeLink to={ROUTES.HOME}>Home</Room.HomeLink>
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
      <Room.User>
        <Room.UserNickname>{nickname}</Room.UserNickname>
        <ChangeNicknameButton/>
      </Room.User>
      <Room.Info>{roomId}</Room.Info>
      <GameSelect>
        <GameSelect.Game>Uno</GameSelect.Game>
        <GameSelect.Game>Chess</GameSelect.Game>
      </GameSelect>
      <Room.Options></Room.Options>
      <Chat>
        <Chat.Form>
          <Chat.Message></Chat.Message>
          <Chat.Send>Send</Chat.Send>
        </Chat.Form>
        <Chat.Log></Chat.Log>
      </Chat>
    </Room>
  )
}