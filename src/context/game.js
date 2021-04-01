import React, { useState, useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { firebaseContext } from './firebase'
import { localSettingsContext } from './local-settings'
import alertError from '../utils/alert-error'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { user } = useContext(firebaseContext)
  const { getRotatedPosition } = useContext(localSettingsContext)
  const { roomId } = useParams()
  const [pieces, setPieces] = useState({})
  const [heldPiece, setHeldPiece] = useState()
  const containerRef = useRef()
  const lastUpdated = useRef()

  const { firebase } = window
  const database = firebase.database()

  const allowedProperties = ['game', 'name', 'color', 'size', 'holder', 'position', 'custom_value']
  const piecesRef = database.ref(`rooms/${roomId}/pieces`)
  const piecesIdsRef = database.ref(`rooms/${roomId}/pieces/ids`)
  const maxPieces = 50

  const areTooManyPieces = (numberToAdd = 1) => {
    if (Object.keys(pieces).length + numberToAdd > maxPieces) {
      alertError(
        `Adding ${numberToAdd} piece(s) will put you over the ${maxPieces} pieces limit, remove some before trying again`
      )
      return true
    }

    return false
  }

  const updatePieceInDatabase = (pieceId, properties) => {
    const filteredEntries = Object.entries(properties).filter(entry => (
      allowedProperties.includes(entry[0])
    ))
    const mappedEntries = filteredEntries.map(([key, value]) => [
      `details/${pieceId}/${key}`,
      value
    ])
    if (lastUpdated.current !== pieceId) {
      // keep track of time of last update, for layering
      mappedEntries.push([`ids/${pieceId}`, firebase.database.ServerValue.TIMESTAMP])
      // using server timestamp causes child_updated to fire twice
    }

    const updates = Object.fromEntries(mappedEntries)
    piecesRef.update(updates, alertError)
  }

  const addPieceToDatabase = ({
    game,
    name,
    color,
    size,
    holder = null,
    position = [50, 50]
  } = {}) => {
    const pieceRef = piecesIdsRef.push()
    const pieceId = pieceRef.key
    pieceRef.set(firebase.database.ServerValue.TIMESTAMP, alertError)
    updatePieceInDatabase(pieceId, { id: pieceId, game, name, color, size, holder, position })
    return pieceId
  }

  const removePieceFromDatabase = pieceId => {
    const idRef = piecesRef.child(`ids/${pieceId}`)
    const detailRef = piecesRef.child(`details/${pieceId}`)
    idRef.remove()
    detailRef.remove()
  }

  const removeAllPiecesFromDatabase = () => {
    // TODO the local delete triggers before confirmed on database... not a huge deal, but causes issues if permissions not set right
    piecesRef.remove()
  }

  const trackProperty = (pieceId, property, callback) => {
    if (!allowedProperties.includes(property)) return
    const detailsRef = database.ref(`rooms/${roomId}/pieces/details/${pieceId}/${property}`)
    detailsRef.on('value', snap => callback(snap.val()), alertError)
  }

  const unTrackProperty = (pieceId, property) => {
    const detailsRef = database.ref(`rooms/${roomId}/pieces/details/${pieceId}/${property}`)
    detailsRef.off()
  }

  const grabPiece = pieceId => {
    setHeldPiece(pieceId)
    updatePieceInDatabase(pieceId, { holder: user.uid })
  }

  const releasePiece = pieceId => {
    setHeldPiece(null)
    updatePieceInDatabase(pieceId, { holder: null })
  }

  const addPiece = (piece, position) => {
    if (areTooManyPieces()) return
    const pieceId = addPieceToDatabase({ ...piece, position, holder: user.uid })
    setHeldPiece(pieceId)
  }

  const removePiece = pieceId => {
    removePieceFromDatabase(pieceId)
  }

  const addMultiplePieces = (newPieces, positions) => {
    if (newPieces.length !== positions.length) return
    if (areTooManyPieces(newPieces.length)) return
    newPieces.forEach((piece, idx) => {
      addPieceToDatabase({ ...piece, position: positions[idx] })
    })
  }

  const clearPieces = () => {
    Object.keys(pieces).length && removeAllPiecesFromDatabase()
  }

  const getRelativePosition = (mouseX, mouseY) => {
    const containerRect = containerRef.current.getBoundingClientRect()
    const relativeX = ((mouseX - containerRect.left) / containerRect.width) * 100
    const relativeY = ((mouseY - containerRect.top) / containerRect.height) * 100
    const position = getRotatedPosition(relativeX, relativeY)
    return position
  }

  useEffect(() => {
    const onPieceRemovedFromDatabase = pieceId => {
      setPieces(state => {
        const newPieces = { ...state }
        delete newPieces[pieceId]
        return newPieces
      })
    }

    const onPieceAddedToDatabase = (pieceId, value = true, pieceUpdated = false) => {
      if (pieceUpdated) lastUpdated.current = pieceId
      setPieces(state => ({ ...state, [pieceId]: value }))
    }

    const initPiecesListener = () => {
      piecesIdsRef.on(
        'child_added',
        snapshot => {
          const pieceId = snapshot.key
          const value = snapshot.val()
          onPieceAddedToDatabase(pieceId, value, false)
        },
        alertError
      )
      piecesIdsRef.on(
        'child_changed',
        snapshot => {
          // TODO this is triggering too many times? (it should only be triggering twice)
          const pieceId = snapshot.key
          const value = snapshot.val()
          onPieceAddedToDatabase(pieceId, value, true)
        },
        alertError
      )
      piecesIdsRef.on(
        'child_removed',
        snapshot => {
          const pieceId = snapshot.key
          onPieceRemovedFromDatabase(pieceId)
        },
        alertError
      )
    }

    const removePiecesListener = () => {
      piecesIdsRef.off()
    }

    initPiecesListener()

    return removePiecesListener
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Provider
      value={{
        containerRef,
        pieces,
        addPiece,
        removePiece,
        grabPiece,
        releasePiece,
        trackProperty,
        unTrackProperty,
        heldPiece,
        updatePieceInDatabase,
        getRelativePosition,
        addMultiplePieces,
        clearPieces
      }}
    >
      {children}
    </Provider>
  )
}

export { context as gameContext, ContextProvider as GameContextProvider }
