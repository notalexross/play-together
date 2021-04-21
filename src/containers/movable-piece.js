// ctrl+click or double click/tap to change colour
// right click or hold touch to remove piece
// hold piece and scroll to change size

import React, { useState, useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { gameContext } from '../context/game'
import { firebaseContext } from '../context/firebase'
import { presenceContext } from '../context/presence'
import { localSettingsContext } from '../context/local-settings'
import { Playarea } from '../components'
import roll from '../utils/roll'

export default function MovablePiece({ pieceId, ...restProps }) {
  const {
    grabPiece,
    releasePiece,
    removePiece,
    trackProperty,
    unTrackProperty,
    heldPiece,
    updatePieceInDatabase,
    getRelativePosition
  } = useContext(gameContext)
  const { storedUsers } = useContext(presenceContext)
  const { user } = useContext(firebaseContext)
  const { getUnrotatedPosition } = useContext(localSettingsContext)
  const [game, setGame] = useState()
  const [name, setName] = useState()
  const [color, setColor] = useState('#fff')
  const [size, setSize] = useState()
  const [position, setPosition] = useState([-1000, -1000])
  const [holder, setHolder] = useState()
  const [customValue, setCustomValue] = useState()
  const doubleClick = useRef(false)
  const isDeleted = useRef(false)
  const currentSize = useRef()
  const currentHeldPiece = useRef()
  const unRotatedX = useRef()
  const unRotatedY = useRef()

  const isFirstRender = useRef(true)

  currentSize.current = size
  currentHeldPiece.current = heldPiece
  const isSizeDefined = size !== undefined
  const unRotatedPosition = (position && getUnrotatedPosition(...position)) || [];
  [unRotatedX.current, unRotatedY.current] = unRotatedPosition

  const style = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    left: `${unRotatedX.current}%`,
    top: `${unRotatedY.current}%`,
    zIndex: 100,
    cursor: heldPiece === pieceId ? 'grabbing' : 'grab'
  }

  const updateColor = () => {
    const randomColor = Math.floor(Math.random() * 16 ** 6).toString(16)
    !isDeleted.current && updatePieceInDatabase(pieceId, { color: `#${randomColor}` })
  }

  const handleClick = event => {
    if (event.button === 0 && event.ctrlKey) {
      updateColor()
    }
  }

  const handleContextMenu = () => {
    isDeleted.current = true
    removePiece(pieceId)
  }

  const handleMouseDown = event => {
    if (!event.button || event.button === 0) {
      grabPiece(pieceId)
    }

    if (doubleClick.current) {
      doubleClick.current = false
      updateColor()
    } else {
      doubleClick.current = true
      setTimeout(() => {
        doubleClick.current = false
      }, 300)
    }
  }

  const customAction = () => {
    if (!isDeleted.current && game === 'dice') {
      roll(
        value => {
          !isDeleted.current && updatePieceInDatabase(pieceId, { custom_value: value })
        },
        { sides: 6 }
      )
    }
  }

  useEffect(() => {
    trackProperty(pieceId, 'game', setGame)
    trackProperty(pieceId, 'name', setName)
    trackProperty(pieceId, 'color', setColor)
    trackProperty(pieceId, 'size', setSize)
    trackProperty(pieceId, 'position', setPosition)
    trackProperty(pieceId, 'holder', setHolder)
    trackProperty(pieceId, 'custom_value', setCustomValue)

    return () => {
      unTrackProperty(pieceId, 'game')
      unTrackProperty(pieceId, 'name')
      unTrackProperty(pieceId, 'color')
      unTrackProperty(pieceId, 'size')
      unTrackProperty(pieceId, 'position')
      unTrackProperty(pieceId, 'holder')
      unTrackProperty(pieceId, 'custom_value')
    }
  }, [pieceId, trackProperty, unTrackProperty])

  const attachHeldPieceListeners = () => {
    if (!isSizeDefined) return undefined
    if (heldPiece !== pieceId) return undefined

    const onMouseMove = event => {
      const isTouch = !!event.touches
      isTouch || event.preventDefault() // so chat doesn't get highlighted as you drag pieces
      const mouseX = event.clientX !== undefined ? event.clientX : event.touches[0].clientX
      const mouseY = event.clientY !== undefined ? event.clientY : event.touches[0].clientY
      const relativePosition = getRelativePosition(mouseX, mouseY)

      !isDeleted.current && updatePieceInDatabase(pieceId, { position: relativePosition })
    }

    const handleMouseUp = event => {
      // preventDefault on touchend event handler prevents mousedown and mouseup events triggering afterwards
      event.preventDefault()
      if (heldPiece === pieceId) {
        releasePiece(pieceId)
      }
    }

    const handleWheelMove = event => {
      const maxSize = 1
      const minSize = 0.04
      const increment = event.deltaY > 0 ? 1 : -1

      let newSize = currentSize.current - increment * 0.02
      if (newSize > maxSize) {
        newSize = maxSize
      } else if (newSize < minSize) {
        newSize = minSize
      }

      !isDeleted.current && updatePieceInDatabase(pieceId, { size: newSize })
    }

    window.addEventListener('touchmove', onMouseMove)
    window.addEventListener('touchend', handleMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('wheel', handleWheelMove)

    return () => {
      window.removeEventListener('touchmove', onMouseMove)
      window.removeEventListener('touchend', handleMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('wheel', handleWheelMove)
    }
  }

  const cleanUpPieces = () => {
    if (isFirstRender.current) return
    if (holder && holder !== user.uid) return

    const isInsideBoard = [unRotatedX.current, unRotatedY.current].every(
      coord => coord >= 0 && coord <= 100
    )
    const isCurrentOwnerButUnheldAndOutsideBoard =
      holder === user.uid && currentHeldPiece.current !== pieceId && !isInsideBoard
    const isOrphanedOutsideBoard = !holder && !isInsideBoard
    const shouldRemove = isOrphanedOutsideBoard || isCurrentOwnerButUnheldAndOutsideBoard

    if (shouldRemove) {
      removePiece(pieceId)
    }
  }

  useEffect(
    attachHeldPieceListeners,
    [isSizeDefined, heldPiece, pieceId, getRelativePosition, updatePieceInDatabase, releasePiece]
  )

  useEffect(cleanUpPieces, [holder, pieceId, removePiece, user.uid])

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  return game && name ? (
    <Playarea.Piece
      style={style}
      game={game}
      name={name}
      color={color}
      sizeFraction={size}
      holderColor={holder && storedUsers[holder] && storedUsers[holder].color}
      customValue={customValue}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      onMouseUp={customAction}
      onTouchEnd={customAction}
      {...restProps}
    />
  ) : null
}

MovablePiece.propTypes = {
  pieceId: PropTypes.string
}
