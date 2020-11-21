import React from 'react'
import { Playarea } from '../components'
import useDrag from '../hooks/useDrag'

export default function GameContainer() {
  const { parentRef, addDragItem, items, drag, removeDragItem } = useDrag()

  // TODO
  const pieces = [
    {id: 1, game: "chess", filename: "white-king.svg", size: "0.1"},
    {id: 2, game: "chess", filename: "black-king.svg", size: "0.1"},
    {id: 3, game: "chess", filename: "white-queen.svg", size: "0.1"},
    {id: 4, game: "chess", filename: "black-queen.svg", size: "0.1"},
    {id: 5, game: "chess", filename: "white-bishop.svg", size: "0.3"},
    {id: 6, game: "chess", filename: "black-bishop.svg", size: "0.1"},
    {id: 7, game: "chess", filename: "white-knight.svg", size: "0.1"},
    {id: 8, game: "chess", filename: "black-knight.svg", size: "0.1"},
    {id: 9, game: "chess", filename: "white-rook.svg", size: "0.1"},
    {id: 10, game: "chess", filename: "black-rook.svg", size: "0.1"},
    {id: 11, game: "chess", filename: "white-pawn.svg", size: "0.1"},
    {id: 12, game: "chess", filename: "black-pawn.svg", size: "0.1"},
  ]


  const handleMouseDown = event => {
    event.preventDefault()
    if (event.button !== 0) return
    const piece = JSON.parse(event.target.dataset.piece)
    if (piece.dragId !== undefined) {
      drag(piece, event.clientX, event.clientY)
    } else {
      addDragItem(piece, event.clientX, event.clientY)
    }   
  }

  const handleRightClick = event => {
    event.preventDefault()
    const piece = JSON.parse(event.target.dataset.piece)
    removeDragItem(piece)
  }


  // TODO pointer-events for svg images
  // TODO add mouseover effect on pieces, where scrollwheel enlarges them individually.
  // TODO resize all pieces in settings (will reset all sizes to new settings)
  // TODO scale all pieces in settings (will scale current sizing up or down)
  // TODO remove piece from table on right click
  // TODO make non transparent image the only clickable part if possible
  // TODO add clear button (to settings menu?)
  // TODO add a "snap to grid" option in settings, define grid separation based on game board.
  // TODO figure out how to fix scrolling when covered by a large piece

  return (
    <Playarea aspectRatio='0.75' paddingFraction='0.03'>
      <Playarea.Board game='chess' paddingFraction='0.06'>
        <Playarea.BoardPiecesContainer ref={parentRef}>
          {items.map(piece => (
            <Playarea.Piece
              key={piece.dragId}
              game={piece.game}
              filename={piece.filename}
              sizeFraction={piece.size}
              data-piece={JSON.stringify(piece)}
              dragStyle={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                left: `${piece.positionX}%`,
                top: `${piece.positionY}%`,
                zIndex: 100,
              }}
              onMouseDown={handleMouseDown}
              onContextMenu={handleRightClick}
            />
          ))}
        </Playarea.BoardPiecesContainer>
      </Playarea.Board>
      <Playarea.Pieces>
        {pieces.map(piece => (
          <Playarea.Piece
            key={piece.id}
            game={piece.game}
            filename={piece.filename}
            sizeFraction={piece.size}
            data-piece={JSON.stringify(piece)}
            onMouseDown={handleMouseDown}
          />
        ))}
      </Playarea.Pieces>
    </Playarea>
  )
}