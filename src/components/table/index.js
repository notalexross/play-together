// TODO
import React from 'react'
import PropTypes from 'prop-types'
import { Container, Board, Seats, Actions } from './styles'

export default function Table({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}

Table.Board = function TableBoard({ children, ...restProps }) {
  return <Board {...restProps}>{children}</Board>
}

Table.Seats = function TableSeats({ children, ...restProps }) {
  return <Seats {...restProps}>{children}</Seats>
}

Table.Actions = function TableActions({ children, ...restProps }) {
  return <Actions {...restProps}>{children}</Actions>
}
