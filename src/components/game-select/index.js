// TODO
import React from 'react'
import PropTypes from 'prop-types'
import { Container, Game } from './styles'

export default function GameSelect({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}

GameSelect.Game = function RoomProfileGame({ children, ...restProps }) {
  return <Game {...restProps}>{children}</Game>
}