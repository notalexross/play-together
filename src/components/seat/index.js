import React, { useContext } from 'react'
import { Container } from './styles'
import { gameContext } from '../../context/gameContext'

export default function Seat() {
  const { roomId, sitDown } = useContext(gameContext)

  // TODO check in context whether seat is taken and details of the person in the seat

  return (
    <Container>
      <p>{roomId}</p>
      <br/>
      <button onClick={() => sitDown(123456, 0)}>sit down</button>
    </Container>
  )
}

Seat.Container = function SeatContainer() {
  return null
}