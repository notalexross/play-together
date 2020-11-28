// ctrl+click or double click/tap to change colour
// right click or hold touch to remove piece
// hold piece and scroll to change size

import React, { useState, useContext, useEffect, useRef } from 'react'
import { gameContext } from '../context/game'
import { firebaseContext } from '../context/firebase'
import { Playarea } from '../components'
import roll from '../utils/roll'

export default function MovablePiece({ pieceId, ...restProps }) {
  const { grabPiece, releasePiece, removePiece, trackProperty, unTrackAllProperties, heldPiece, updatePieceInDatabase, getRelativePosition } = useContext(gameContext)
  const { user } = useContext(firebaseContext)
  const [ game, setGame ] = useState()
  const [ name, setName ] = useState()
  const [ color, setColor ] = useState()
  const [ size, setSize ] = useState()
  const [ position, setPosition ] = useState([-1000, -1000])
  const [ holder, setHolder ] = useState()
  const [ customValue, setCustomValue ] = useState()
  const [ amOwner, setAmOwner ] = useState(false)
  const doubleClick = useRef(false)
  const isDeleted = useRef(false)
  const scrollAmount = useRef(0)

  const style = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    left: `${position && position[0]}%`,
    top: `${position && position[1]}%`,
    zIndex: 100,
    cursor: heldPiece === pieceId ? 'grabbing' : 'grab'
  }

  const onMouseMove = event => {
    const isTouch = !!event.touches
    isTouch || event.preventDefault() // so chat doesn't get highlighted as you drag pieces
    const mouseX = event.clientX !== undefined ? event.clientX : event.touches[0].clientX
    const mouseY = event.clientY !== undefined ? event.clientY : event.touches[0].clientY
    const position = getRelativePosition(mouseX, mouseY)

    !isDeleted.current && updatePieceInDatabase(pieceId, { position })
  }

  const handleMouseUp = (event) => {
    event.preventDefault() // preventDefault on touchend event handler prevents mousedown and mouseup events triggering afterwards
    // console.log('mouseup')
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

  const updateColor = () => {
    const randomColor = Math.floor(Math.random() * 16 ** 6).toString(16)
    !isDeleted.current && updatePieceInDatabase(pieceId, { color: `#${randomColor}` })
  }

  const handleClick = event => {
    if (event.button === 0 && event.ctrlKey) {
      updateColor()
    }
  }

  const handleContextMenu = event => {
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

  const customAction = event => {
    // if (event.button === undefined || event.button === 0) {
      if (!isDeleted.current && game === 'dice') {
        roll((value) => {
          !isDeleted.current && updatePieceInDatabase(pieceId, { customValue: value })
        }, { sides: 6 })
      }
    // }
  }

  useEffect(() => {
    trackProperty(pieceId)
    trackProperty(pieceId, 'game', game => setGame(game))
    trackProperty(pieceId, 'name', name => setName(name))
    trackProperty(pieceId, 'color', color => setColor(color))
    trackProperty(pieceId, 'size', size => setSize(size))
    trackProperty(pieceId, 'position', position => setPosition(position))
    trackProperty(pieceId, 'holder', holder => setHolder(holder))
    trackProperty(pieceId, 'customValue', customValue => setCustomValue(customValue))
    return () => {
      unTrackAllProperties(pieceId)
    }
  }, [])

  useEffect(() => {
    if (size === undefined) return
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
  }, [size !== undefined, heldPiece])

  useEffect(() => {
    if (!holder && amOwner && position && position.some(coord => coord < 0 || coord > 100)) {
      removePiece(pieceId)
    }
    if (holder && holder !== user.uid) {
      setAmOwner(false)
    }
  }, [holder])

  return ( game && name ? 
    <Playarea.Piece
      style={style}
      game={game}
      name={name}
      color={color}
      sizeFraction={size}
      customValue={customValue}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      onMouseUp={customAction}
      onTouchEnd={customAction}
      {...restProps}
    /> : null
  )
}