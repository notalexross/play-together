import React, { useContext, useState, useEffect } from 'react'
import { Playarea } from '../components'
import { windowContext } from '../context/window'
import { gameContext } from '../context/game'
import { settingsContext } from '../context/settings'
import { localSettingsContext } from '../context/local-settings'
import MovablePiece from './movable-piece.js'
import FavoritablePiece from './favoritable-piece.js'

export default function GameContainer() {
  const { containerRef, pieces, addPiece, getRelativePosition } = useContext(gameContext)
  const { windowWidth } = useContext(windowContext)
  const { globalSettings } = useContext(settingsContext)
  const { piecesGroup } = useContext(localSettingsContext)

  const isSmall = windowWidth <= 800

  const handleAddPiece = (event, piece) => {
    if (event.button !== undefined && event.button !== 0 ) return
    const mouseX = event.clientX !== undefined ? event.clientX : event.touches[0].clientX
    const mouseY = event.clientY !== undefined ? event.clientY : event.touches[0].clientY
    const position = getRelativePosition(mouseX, mouseY)
    addPiece(piece, position)
  }

  // paddingFraction on board has to be same on all displays, otherwise coordinates no longer work
  return (
    <Playarea aspectRatio={isSmall ? 0.81 : 0.75} paddingFraction={isSmall ? 0.005 : 0.03}>
      <Playarea.Board game={globalSettings.game} color={globalSettings.boardColor} paddingFraction={0.06}>
        <Playarea.BoardPiecesContainer ref={containerRef}>
          {Object.entries(pieces).sort(([_, a], [__, b]) => a - b).map(([pieceId, _]) => (
            <MovablePiece
              key={pieceId}
              pieceId={pieceId}
            />
          ))}
        </Playarea.BoardPiecesContainer>
      </Playarea.Board>
      <Playarea.Pieces>
        {piecesGroup.map(piece => (
          <FavoritablePiece
            key={piece.id}
            piece={piece}
            game={piece.game}
            name={piece.name}
            color={piece.color}
            sizeFraction={piece.size}
            onMouseDown={e => handleAddPiece(e, piece)}
            onTouchStart={e => handleAddPiece(e, piece)}
          />
          // <Playarea.Piece
          //   key={piece.id}
          //   game={piece.game}
          //   name={piece.name}
          //   color={piece.color}
          //   sizeFraction={piece.size}
          //   onMouseDown={e => handleAddPiece(e, piece)}
          //   onTouchStart={e => handleAddPiece(e, piece)}
          //   onContextMenu={e => addToFavorites(piece)} // TODO move to a favourites wrapper
          // />
        ))}
      </Playarea.Pieces>
    </Playarea>
  )
}