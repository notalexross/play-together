import React, { useContext, useState, useEffect } from 'react'
import { Playarea } from '../components'
import { windowContext } from '../context/window'
import { gameContext } from '../context/game'
import { settingsContext } from '../context/settings'
import { localSettingsContext } from '../context/local-settings'
import setsConfig from '../constants/sets-config'
import piecesConfig from '../constants/pieces-config'
import MovablePiece from './movable-piece.js'

export default function GameContainer() {
  const { containerRef, pieces, addPiece, getRelativePosition } = useContext(gameContext)
  const { windowWidth } = useContext(windowContext)
  const { globalSettings } = useContext(settingsContext)
  const { localSettings } = useContext(localSettingsContext)
  const [ piecesGroup, setPiecesGroup ] = useState([])

  const isSmall = windowWidth <= 800

  useEffect(() => {
    const set = setsConfig[localSettings.piecesGroup] || setsConfig["chess"]
    const setMapped = set.map(piece => ({id: piece, ...piecesConfig[piece]}))
    setPiecesGroup(setMapped)
  }, [localSettings.piecesGroup])

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
          <Playarea.Piece
            key={piece.id}
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