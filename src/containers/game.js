import React, { useContext } from 'react'
import { Playarea } from '../components'
import { windowContext } from '../context/window'
import { gameContext } from '../context/game'
import MovablePiece from './movable-piece.js'

export default function GameContainer() {
  const { containerRef, pieces, addPiece, getRelativePosition } = useContext(gameContext)
  const { windowWidth } = useContext(windowContext)

  const isSmall = windowWidth <= 800

  // TODO
  const piecesCollection = [
    {game: "chess", name: "king", color: "#fff", size: "0.1"},
    {game: "chess", name: "kingDark", color: "#000", size: "0.1"},
    {game: "chess", name: "queen", color: "#fff", size: "0.1"},
    {game: "chess", name: "queenDark", color: "#000", size: "0.1"},
    {game: "chess", name: "bishop", color: "#fff", size: "0.1"},
    {game: "chess", name: "bishopDark", color: "#000", size: "0.1"},
    {game: "chess", name: "knight", color: "#fff", size: "0.1"},
    {game: "chess", name: "knightDark", color: "#000", size: "0.1"},
    {game: "chess", name: "rook", color: "#fff", size: "0.1"},
    {game: "chess", name: "rookDark", color: "#000", size: "0.1"},
    {game: "chess", name: "pawn", color: "#fff", size: "0.1"},
    {game: "chess", name: "pawnDark", color: "#000", size: "0.1"},
    {game: "ludo", name: "pawn", color: "green", size: "0.045"},
    {game: "ludo", name: "pawn", color: "red", size: "0.045"},
    {game: "ludo", name: "pawn", color: "cyan", size: "0.045"},
    {game: "ludo", name: "pawn", color: "yellow", size: "0.045"},
    {game: "dice", name: "d6", color: "white", size: "0.07"}
  ]

  const handleAddPiece = (event, piece) => {
    if (event.button !== undefined && event.button !== 0 ) return
    const mouseX = event.clientX !== undefined ? event.clientX : event.touches[0].clientX
    const mouseY = event.clientY !== undefined ? event.clientY : event.touches[0].clientY
    const position = getRelativePosition(mouseX, mouseY)
    addPiece(piece, position)
  }

  // TODO resize all pieces in settings (will reset all sizes to new settings)
  // TODO scale all pieces in settings (will scale current sizing up or down)
  // TODO add clear button (to settings menu?)
  // TODO add a "snap to grid" option in settings, define grid separation based on game board.

  return (
    <Playarea aspectRatio={isSmall ? 0.81 : 0.75} paddingFraction={isSmall ? 0.005 : 0.03}>
      <Playarea.Board game='chess' color='white' paddingFraction={isSmall ? 0 : 0.06}>
        <Playarea.BoardPiecesContainer ref={containerRef}>
          {Object.keys(pieces).map(pieceId => (
            <MovablePiece
              key={pieceId}
              pieceId={pieceId}
            />
          ))}
        </Playarea.BoardPiecesContainer>
      </Playarea.Board>
      <Playarea.Pieces>
        {piecesCollection.map((piece, idx) => (
          <Playarea.Piece
            key={idx}
            game={piece.game}
            name={piece.name}
            color={piece.color}
            sizeFraction={piece.size}
            onMouseDown={e => handleAddPiece(e, piece)}
            onTouchStart={e => handleAddPiece(e, piece)}
          />
        ))}
      </Playarea.Pieces>
    </Playarea>
  )
}