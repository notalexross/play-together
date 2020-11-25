import React, { useState, useEffect } from 'react'
import FIREBASE_CONFIG from '../constants/firebase-config'
import useForceRender from '../hooks/useForceRender.js'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const [ currentUser, setCurrentUser ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ userColor, setUserColor ] = useState(window.localStorage.getItem('color'))
  const forceRender = useForceRender()

  const firebase = window.firebase

  const updateUserInDatabase = async (user, { color } = {}) => {
    const usersRef = firebase.firestore().collection('users')

    return await usersRef.doc(user.uid).set({
      displayName: user.displayName,
      color: color || userColor || updateLocalColor(randomBasicColor()),
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

  const setNickname = async newNickname => {
    return await currentUser.updateProfile({
      displayName: newNickname
    }).then(() => {
      console.log('updated display name')
      updateUserInDatabase(currentUser)
      forceRender()
    }).catch(error => {
      console.error(error)
    })
  }

  const setColor = newColor => {
    updateLocalColor(newColor)
    updateUserInDatabase(currentUser, { color: newColor })
  }

  const updateLocalColor = newColor => {
    window.localStorage.setItem('color', newColor)
    setUserColor(newColor)
    return newColor
  }

  const randomBasicColor = () => {
    const R = (Math.round(Math.random()) * 255).toString(16).padEnd(2,'0').slice(0,3)
    const G = (Math.round(Math.random()) * 255).toString(16).padEnd(2,'0').slice(0,3)
    const B = (Math.round(Math.random()) * 255).toString(16).padEnd(2,'0').slice(0,3)

    console.log(`#${R}${G}${B}`)

    return `#${R}${G}${B}`
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
      } else {
        console.log('signed out')
        signIn()
      }
    });

    return listener
  }

  useEffect(() => {
    if (!currentUser) return
    if (currentUser.displayName) {
      setIsLoading(false)
    } else {
      setNickname('Unknown').then(() => {
        setIsLoading(false)
      })
    }
  }, [currentUser])

  useEffect(() => {
    return initApp()
  }, [])

  return (
    <Provider value={{ user: currentUser, firebase, setNickname, userColor, setColor, doesRoomExist, createRoom }} >
      {isLoading ? null : children}
    </Provider>
  )
}

export { context as firebaseContext, ContextProvider as FirebaseContextProvider }