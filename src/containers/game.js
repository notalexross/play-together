import React from 'react'
import { Playarea } from '../components'

export default function GameContainer() {

  // TODO
  const pieces = [
    {game: "checkers", name: "red"},
    {game: "checkers", name: "blue"},
  ]

  return (
    <Playarea aspectRatio='0.75' paddingFraction='0.03'>
      <Playarea.Board game='checkers' paddingFraction='0.06' />
      <Playarea.Pieces>
        <Playarea.Piece />
        <Playarea.Piece backgroundColor='royalblue' />

        {/* <Playarea.Piece sizeFraction='0.2' /> */}
      </Playarea.Pieces>
    </Playarea>
  )
}