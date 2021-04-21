import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { firebaseContext } from './firebase'
import { alertError } from '../utils'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { user } = useContext(firebaseContext)
  const { roomId } = useParams()
  const [onlineUsers, setOnlineUsers] = useState([])
  const [storedUsers, setStoredUsers] = useState({})
  const userListeners = useRef({})
  const currentStoredUsers = useRef()

  const { firebase } = window
  currentStoredUsers.current = storedUsers

  const addToStoredUsers = useCallback(uids => {
    const firestore = firebase.firestore()
    const usersRef = firestore.collection('users')
    const storedUids = Object.keys(currentStoredUsers.current)
    const filteredUids = uids.filter(uid => !storedUids.includes(uid))
    filteredUids.forEach(uid => {
      const query = usersRef.doc(uid)
      query.get().then(doc => {
        const { displayName, color } = doc.data()
        setStoredUsers(state => ({
          ...state,
          [uid]: {
            displayName,
            color
          }
        }))
      })
    })
  }, [firebase])

  useEffect(() => {
    const database = firebase.database()
    const firestore = firebase.firestore()
    const usersRef = firestore.collection('users')
    const roomRef = database.ref(`rooms/${roomId}`)
    const onlineUsersRef = roomRef.child('users')
    const userRef = onlineUsersRef.child(user.uid)
    const connectionsRef = userRef.child('connections')
    const connectedRef = database.ref('.info/connected')

    const goOnline = () => {
      connectedRef.on(
        'value',
        snap => {
          if (snap.val() === true) {
            const connection = connectionsRef.push()
            connection
              .onDisconnect()
              .remove(err => {
                if (err) {
                  console.error('could not establish onDisconnect event', err)
                }
              })
              .then(() => {
                connection.set(true)
              })
          }
        },
        alertError
      )
      database.goOnline()
    }

    const goOffline = () => {
      database.goOffline()
      connectedRef.off()
    }

    const addUserListener = uid => {
      if (userListeners.current && userListeners.current[uid]) return

      const query = usersRef.doc(uid)
      const newListener = query.onSnapshot(snapshot => {
        if (snapshot.metadata.hasPendingWrites) return
        if (!snapshot.data()) return
        const { displayName, color } = snapshot.data()
        setStoredUsers(state => ({
          ...state,
          [uid]: {
            displayName,
            color
          }
        }))
      })
      userListeners.current = {
        ...userListeners.current,
        [uid]: newListener
      }
    }

    const removeUserListener = uid => {
      const listener = userListeners.current[uid]
      if (listener) {
        listener()
        delete userListeners.current[uid]
      }
    }

    const removeAllUserListeners = () => {
      Object.keys(userListeners.current).forEach(uid => {
        removeUserListener(uid)
      })
    }

    const initPresenceListeners = () => {
      onlineUsersRef.on(
        'child_added',
        snapshot => {
          if (!snapshot) return
          setOnlineUsers(users => [...users, snapshot.key])
          addUserListener(snapshot.key)
        },
        alertError
      )
      onlineUsersRef.on(
        'child_removed',
        snapshot => {
          if (!snapshot) return
          setOnlineUsers(users => users.filter(key => key !== snapshot.key))
          removeUserListener(snapshot.key)
        },
        alertError
      )
    }

    initPresenceListeners()
    goOnline()

    return () => {
      onlineUsersRef.off()
      removeAllUserListeners()
      goOffline()
    }
  }, [firebase, roomId, user.uid])

  return (
    <Provider
      value={{
        onlineUsers,
        storedUsers,
        addToStoredUsers
      }}
    >
      {children}
    </Provider>
  )
}

export { context as presenceContext, ContextProvider as PresenceContextProvider }
