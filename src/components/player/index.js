// TODO
import React from 'react'
import PropTypes from 'prop-types'
import { Container, ProfilePicture, Stats, Wins, Played, Nickname, Hand, Card, Playarea } from './styles'

export default function Player({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}

Player.ProfilePicture = function PlayerProfilePicture({ ...restProps }) {
  return <ProfilePicture {...restProps} />
}

Player.Stats = function PlayerStats({ children, ...restProps }) {
  return <Stats {...restProps}>{children}</Stats>
}

Player.Wins = function PlayerWins({ children, ...restProps }) {
  return <Wins {...restProps}>{children}</Wins>
}

Player.Played = function PlayerPlayed({ children, ...restProps }) {
  return <Played {...restProps}>{children}</Played>
}

Player.Nickname = function PlayerNickname({ children, ...restProps }) {
  return <Nickname {...restProps}>{children}</Nickname>
}

Player.Hand = function PlayerHand({ children, ...restProps }) {
  return <Hand {...restProps}>{children}</Hand>
}

Player.Card = function PlayerCard({ ...restProps }) {
  return <Card {...restProps} />
}

Player.Playarea = function PlayerPlayarea({ children, ...restProps }) {
  return <Playarea {...restProps}>{children}</Playarea>
}