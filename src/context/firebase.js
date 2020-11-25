import React, { useState, useEffect } from 'react'
import FIREBASE_CONFIG from '../constants/firebase-config'
import useForceRender from '../hooks/useForceRender.js'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const [ currentUser, setCurrentUser ] = useState(null)
  const [ currentRoom, setCurrentRoom ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)
  const forceRender = useForceRender()

  const firebase = window.firebase

  const updateUserInDatabase = async (user) => {
    const usersRef = firebase.firestore().collection('users')

    return await usersRef.doc(user.uid).set({
      displayName: user.displayName,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(error => {
      console.error(error)
    })
  }

  const signIn = () => {
    if (firebase.auth().currentUser) return
    firebase.auth().signInAnonymously().catch((error) => {
      console.error(error)
    });
  }

  const setNickname = newNickname => {
    currentUser.updateProfile({
      displayName: newNickname
    }).then(() => {
      console.log('updated display name')
      updateUserInDatabase(currentUser)
      forceRender()
    }).catch(error => {
      console.error(error)
    })
  }

  const createRoom = async () => {
    console.log('creating game room')
    const roomsRef = firebase.firestore().collection('rooms')

    return await roomsRef.add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: currentUser.uid
    }).then(docRef => {
      console.log(`created room: ${docRef.id}`)
      return docRef.id
    }).catch(error => {
      console.error(error)
    })
  }

  const doesRoomExist = async (roomId) => {
    console.log('checking if room exists')
    const roomsRef = firebase.firestore().collection('rooms')
    const docRef = roomsRef.doc(roomId)
    return await docRef.get().then(doc => {
      console.log(`room ${doc.exists ? 'exists' : 'does not exist'}`)
      return doc.exists
    }).catch((error) => {
      console.error(error)
    })
  }

  const initApp = () => {
    firebase.initializeApp(FIREBASE_CONFIG)

    const listener = firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
      if (user) {
        console.log('signed in')
        updateUserInDatabase(user).then(() => {
          isLoading && setIsLoading(false)
        })
      } else {
        console.log('signed out')
        signIn()
      }
    });

    return listener
  }

  useEffect(() => {
    return initApp()
  }, [])

  return (
    <Provider value={{ user: currentUser, firebase, setNickname, currentRoom, doesRoomExist, createRoom }} >
      {isLoading ? null : children}
    </Provider>
  )
}

export { context as firebaseContext, ContextProvider as FirebaseContextProvider }