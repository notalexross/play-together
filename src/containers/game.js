import React from 'react'
import { Playarea } from '../components'

export default function GameContainer() {

  // TODO
  const pieces = [
    {game: "chess", filename: "black-king.svg"},
    {game: "chess", filename: "white-king.svg"},
  ]

  return (
    <Playarea aspectRatio='0.75' paddingFraction='0.03'>
      <Playarea.Board game='checkers' paddingFraction='0.06' />
      <Playarea.Pieces>
        <Playarea.Piece game='chess' filename='white-king.svg'/>
        <Playarea.Piece game='chess' filename='black-king.svg'/>
        <Playarea.Piece game='chess' filename='black-king.svg' sizeFraction='0.2'/>
        <Playarea.Piece game='chess' filename='black-king.svg' sizeFraction='0.15'/>
        <Playarea.Piece game='chess' filename='black-king.svg' sizeFraction='0.25'/>
        <Playarea.Piece game='chess' filename='black-king.svg' sizeFraction='0.05'/>

        {/* <Playarea.Piece backgroundColor='royalblue' /> */}

        {/* <Playarea.Piece sizeFraction='0.2' /> */}
      </Playarea.Pieces>
    </Playarea>
  )
}