import React from 'react'
import { Playarea } from '../components'

export default function GameContainer() {
  return (
    <Playarea>
      <Playarea.Board game='checkers' />
      <Playarea.Pieces game='checkers' />
    </Playarea>
  )
}