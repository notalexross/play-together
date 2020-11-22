import React from 'react'
import { Playarea } from '../components'
import useDrag from '../hooks/useDrag'

export default function GameContainer() {
  const { parentRef, addDragItem, items, drag, removeDragItem } = useDrag()

  // TODO
  const pieces = [
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
    {game: "dice", name: "d6", color: "blue", size: "0.045"}
  ]

  const handleMouseDown = event => {
    event.preventDefault()

    if (event.button !== 0) return
    const piece = JSON.parse(event.currentTarget.dataset.piece)
    if (piece.dragId !== undefined) {
      drag(piece, event.clientX, event.clientY)
    } else {
      addDragItem(piece, event.clientX, event.clientY)
    }   
  }

  const handleRightClick = event => {
    event.preventDefault()
    const piece = JSON.parse(event.currentTarget.dataset.piece)
    removeDragItem(piece)
  }

  // TODO add mouseover effect on pieces, where scrollwheel enlarges them individually.
  // TODO resize all pieces in settings (will reset all sizes to new settings)
  // TODO scale all pieces in settings (will scale current sizing up or down)
  // TODO make non transparent image the only clickable part if possible
  // TODO add clear button (to settings menu?)
  // TODO add a "snap to grid" option in settings, define grid separation based on game board.

  return (
    <Playarea aspectRatio='0.75' paddingFraction='0.03'>
      <Playarea.Board game='chess' color='white' paddingFraction='0.06'>
        <Playarea.BoardPiecesContainer ref={parentRef}>
          {items.map(piece => (
            <Playarea.Piece
              key={piece.dragId}
              game={piece.game}
              name={piece.name}
              color={piece.color}
              sizeFraction={piece.size}
              data-piece={JSON.stringify(piece)}
              onMouseDown={handleMouseDown}
              onContextMenu={handleRightClick}
              dragStyle={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                left: `${piece.positionX}%`,
                top: `${piece.positionY}%`,
                zIndex: 100,
                cursor: piece.isBeingDragged ? 'grabbing' : 'grab'
              }}
            />
          ))}
        </Playarea.BoardPiecesContainer>
      </Playarea.Board>
      <Playarea.Pieces>
        {pieces.map((piece, idx) => (
          <Playarea.Piece
            key={idx}
            game={piece.game}
            name={piece.name}
            color={piece.color}
            sizeFraction={piece.size}
            data-piece={JSON.stringify(piece)}
            onMouseDown={handleMouseDown}
          />
        ))}
      </Playarea.Pieces>
    </Playarea>
  )
}