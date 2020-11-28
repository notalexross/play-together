import React, { useState, useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { firebaseContext } from '../context/firebase'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { user } = useContext(firebaseContext)
  const { roomId } = useParams()
  const [ pieces, setPieces ] = useState({})
  const [ heldPiece, setHeldPiece ] = useState()
  const containerRef = useRef()
  const lastUpdated = useRef()

  const firebase = window.firebase
  const database = firebase.database()

  const addPieceToDatabase = ({ game, name, color, size, holder = null, position = [ 50, 50 ] } = {}) => {
    const piecesIdsRef = database.ref(`rooms/${roomId}/pieces/ids`)
    const pieceRef = piecesIdsRef.push()
    const pieceId = pieceRef.key
    pieceRef.set(firebase.database.ServerValue.TIMESTAMP, alertError)

    updatePieceInDatabase(pieceId, { id: pieceId, game, name, color, size, holder, position })

    console.log(`added piece to database: ${pieceId}`)
    return pieceId
  }

  const updatePieceInDatabase = (pieceId, properties) => {
    const allowedProperties = [ 'game', 'name', 'color', 'size', 'holder', 'position', 'customValue' ]
    const piecesRef = database.ref(`rooms/${roomId}/pieces`)
    const filteredEntries = Object.entries(properties).filter(entry => allowedProperties.includes(entry[0]))
    const mappedEntries = filteredEntries.map(([key, value]) => {
      return [ `details/${pieceId}/${key}`, value ]
    })
    if (lastUpdated.current !== pieceId) {
      // using server timestamp causes child_updated to fire twice
      mappedEntries.push([ `ids/${pieceId}`, firebase.database.ServerValue.TIMESTAMP ]) // keep track of time of last update, for layering
    }
    const updates = Object.fromEntries(mappedEntries)
    piecesRef.update(updates, alertError)
  }

  const removePieceFromDatabase = pieceId => {
    const piecesRef = database.ref(`rooms/${roomId}/pieces`)
    const idRef = piecesRef.child(`ids/${pieceId}`)
    const detailRef = piecesRef.child(`details/${pieceId}`)
    idRef.remove()
    detailRef.remove()

    console.log(`removed piece from database: ${pieceId}`)
  }

  const alertError = error => {
    error && console.alert(error)
  }

  const initPiecesListener = () => {
    const piecesIdsRef = database.ref(`rooms/${roomId}/pieces/ids`)
    piecesIdsRef.on('child_added', snapshot => {
      const pieceId = snapshot.key
      const value = snapshot.val()
      onPieceAddedToDatabase(pieceId, value, false)
      console.log(`(listener) new piece: ${pieceId}`)
    })
    piecesIdsRef.on('child_changed', snapshot => {
      // TODO this is triggering too many times (it should only be triggering twice)
      const pieceId = snapshot.key
      const value = snapshot.val()
      onPieceAddedToDatabase(pieceId, value, true)
      console.log(`(listener) piece brought to front: ${pieceId}`)
    })
    piecesIdsRef.on('child_removed', snapshot => {
      const pieceId = snapshot.key
      onPieceRemovedFromDatabase(pieceId)
      console.log(`(listener) piece removed: ${pieceId}`)
    })
  }

  const removePiecesListener = () => {
    const piecesIdsRef = database.ref(`rooms/${roomId}/pieces/ids`)
    piecesIdsRef.off()
  }

  const onPieceRemovedFromDatabase = pieceId => {
    setPieces(pieces => ({...pieces, [pieceId]: undefined}))
  }

  const onPieceAddedToDatabase = (pieceId, value = true, pieceUpdated = false) => {
    if (pieceUpdated) lastUpdated.current = pieceId
    setPieces(pieces => ({...pieces, [pieceId]: value}))
  }

  const trackProperty = (pieceId, property, callback) => {
    const allowedProperties = [ 'game', 'name', 'color', 'size', 'holder', 'position', 'customValue' ]
    if (!allowedProperties.includes(property)) return
    const detailsRef = database.ref(`rooms/${roomId}/pieces/details/${pieceId}/${property}`)
    detailsRef.on('value', snap => callback(snap.val()))
  }

  const unTrackAllProperties = pieceId => {
    const detailsRef = database.ref(`rooms/${roomId}/pieces/details/${pieceId}`)
    detailsRef.off()
  }

  const grabPiece = (pieceId) => {
    // console.log('grabbing piece')
    setHeldPiece(pieceId)
    updatePieceInDatabase(pieceId, { holder: user.uid })
  }

  const releasePiece = (pieceId) => {
    // console.log('releasing piece')
    setHeldPiece(null)
    updatePieceInDatabase(pieceId, { holder: null })
  }

  const addPiece = (piece, position) => {
    const pieceId = addPieceToDatabase({...piece, position, holder: user.uid })
    setHeldPiece(pieceId)
  }

  const removePiece = pieceId => {
    removePieceFromDatabase(pieceId)
  }

  const getRelativePosition = (mouseX, mouseY) => {
    const containerRect = containerRef.current.getBoundingClientRect()
    const relativeX = (mouseX - containerRect.left) / containerRect.width * 100
    const relativeY = (mouseY - containerRect.top) / containerRect.height * 100
    return [relativeX, relativeY]
  }

  useEffect(() => {
    initPiecesListener()

    return removePiecesListener
  }, [])

  return (
    <Provider value={{
      containerRef,
      pieces,
      addPiece,
      removePiece,
      grabPiece,
      releasePiece,
      trackProperty,
      unTrackAllProperties,
      heldPiece,
      updatePieceInDatabase,
      getRelativePosition
    }} >
      {children}
    </Provider>
  )
}

export { context as gameContext, ContextProvider as GameContextProvider }