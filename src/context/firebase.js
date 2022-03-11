import React, { useState, useEffect, useCallback } from 'react'
import FIREBASE_CONFIG from '../constants/firebase-config'
import useForceRender from '../hooks/useForceRender'
import { getRandomPureColor } from '../utils'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [userColor, setUserColor] = useState()
  const forceRender = useForceRender()

  const { firebase } = window

  const updateLocalColor = newColor => {
    setUserColor(newColor)

    return newColor
  }

  const updateUserInDatabase = (user, { color } = {}) => {
    const usersRef = firebase.firestore().collection('users')
    usersRef
      .doc(user.uid)
      .set({
        displayName: user.displayName,
        color: color || userColor || updateLocalColor(getRandomPureColor()),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(console.error)
  }

  const setNickname = newNickname => {
    currentUser
      .updateProfile({
        displayName: newNickname
      })
      .then(() => {
        updateUserInDatabase(currentUser)
        forceRender()
      })
      .catch(console.error)
  }

  const setColor = newColor => {
    updateLocalColor(newColor)
    updateUserInDatabase(currentUser, { color: newColor })
  }

  const createRoom = useCallback(async () => {
    const roomsRef = firebase.firestore().collection('rooms')

    return roomsRef
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: currentUser.uid
      })
      .then(docRef => docRef.id)
      .catch(console.error)
  }, [currentUser.uid, firebase])

  const doesRoomExist = useCallback(async roomId => {
    const roomsRef = firebase.firestore().collection('rooms')
    const docRef = roomsRef.doc(roomId)

    return docRef
      .get()
      .then(doc => doc.exists)
      .catch(console.error)
  }, [firebase])

  useEffect(() => {
    const signIn = () => {
      if (firebase.auth().currentUser) return
      firebase
        .auth()
        .signInAnonymously()
        .catch(console.error)
    }

    const initApp = () => {
      !firebase.apps.length && firebase.initializeApp(FIREBASE_CONFIG)

      const listener = firebase.auth().onAuthStateChanged(user => {
        user ? setCurrentUser(user) : signIn()
      })

      return listener
    }

    return initApp()
  }, [firebase])

  useEffect(() => {
    if (!currentUser.uid) return undefined
    setIsLoading(false)

    const usersRef = firebase.firestore().collection('users')
    const query = usersRef.doc(currentUser.uid)
    const listener = query.onSnapshot(snapshot => {
      const isLocalUpdate = snapshot.metadata.hasPendingWrites
      if (isLocalUpdate) return
      if (!snapshot.exists) return
      setUserColor(snapshot.data().color)
      currentUser.reload().then(forceRender)
    })

    return listener
  }, [currentUser, firebase, forceRender])

  return (
    <Provider
      value={{
        user: currentUser,
        firebase,
        setNickname,
        userColor,
        setColor,
        doesRoomExist,
        createRoom
      }}
    >
      {isLoading ? null : children}
    </Provider>
  )
}

export { context as firebaseContext, ContextProvider as FirebaseContextProvider }
