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
  const [amOwner, setAmOwner] = useState(false)
  const doubleClick = useRef(false)
  const isDeleted = useRef(false)
  const scrollAmount = useRef(0)

  const unRotatedPosition = position && getUnrotatedPosition(...position)

  const style = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    left: `${unRotatedPosition && unRotatedPosition[0]}%`,
    top: `${unRotatedPosition && unRotatedPosition[1]}%`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (size === undefined) return undefined

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
      scrollAmount.current += increment

      let newSize = size - scrollAmount.current * 0.02
      if (newSize > maxSize) {
        newSize = maxSize
        scrollAmount.current -= increment
      } else if (newSize < minSize) {
        newSize = minSize
        scrollAmount.current -= increment
      }

      !isDeleted.current && updatePieceInDatabase(pieceId, { size: newSize })
    }

    if (heldPiece === pieceId) {
      setAmOwner(true)
      scrollAmount.current = 0

      window.addEventListener('touchmove', onMouseMove)
      window.addEventListener('touchend', handleMouseUp)

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('wheel', handleWheelMove)
    }

    return () => {
      window.removeEventListener('touchmove', onMouseMove)
      window.removeEventListener('touchend', handleMouseUp)

      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('wheel', handleWheelMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size !== undefined, heldPiece])

  useEffect(() => {
    if (
      !holder &&
      amOwner &&
      unRotatedPosition &&
      unRotatedPosition.some(coord => coord < 0 || coord > 100)
    ) {
      removePiece(pieceId)
    }

    if (holder && holder !== user.uid) {
      setAmOwner(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holder])

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
