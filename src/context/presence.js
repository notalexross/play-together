import React, { useState, useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { firebaseContext } from '../context/firebase'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { user } = useContext(firebaseContext)
  const { roomId } = useParams()
  const [ onlineUsers, setOnlineUsers ] = useState([])
  const [ storedUsers, setStoredUsers ] = useState({})
  const userListeners = useRef({})

  const firebase = window.firebase
  const database = firebase.database()
  const firestore = firebase.firestore()
  const roomRef = database.ref(`rooms/${roomId}`)
  const onlineUsersRef = roomRef.child('users')
  const usersRef = firestore.collection('users')

  const goOnline = () => {
    const userRef = onlineUsersRef.child(user.uid)
    const connectionsRef = userRef.child('connections')
    const connection = connectionsRef.push()

    connection.onDisconnect().remove()
    connection.set(true)

    database.goOnline()

    console.log('going online: tracking presence')
  }

  const goOffline = () => {
    database.goOffline()
    console.log('going offline')
  }

  const initPresenceListeners = () => {
    const listeners = []
    listeners[0] = onlineUsersRef.on('child_added', snapshot => {
      if (!snapshot) return
      setOnlineUsers(users => [ ...users, snapshot.key ])
      addUserListener(snapshot.key)
    })
    listeners[1] = onlineUsersRef.on('child_removed', snapshot => {
      if (!snapshot) return
      setOnlineUsers(users => users.filter(user => user !== snapshot.key))
      removeUserListener(snapshot.key)
    })

    return () => listeners.forEach(listener => listener())
  }

  const addUserListener = uid => {
    if (userListeners.current && userListeners.current[uid]) return
    const query = usersRef.doc(uid)
    const newListener = query.onSnapshot(snapshot => {
      if (snapshot.metadata.hasPendingWrites) return
      console.log('updating user: '+uid)
      const displayName = snapshot.data().displayName
      const color = snapshot.data().color
      setStoredUsers(storedUsers => ({
        ...storedUsers,
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
    console.log(Object.values(userListeners.current))
    Object.values(userListeners.current).forEach(listener => listener())
  }

  const addToStoredUsers = uids => {
    const storedUids = Object.keys(storedUsers)
    const filteredUids = uids.filter(uid => !storedUids.includes(uid))
    filteredUids.forEach(uid => {
      const query = usersRef.doc(uid)
      query.get().then(doc => {
        const displayName = doc.data().displayName
        const color = doc.data().color
        setStoredUsers(storedUsers => ({
          ...storedUsers,
          [uid]: {
            displayName,
            color
          }
        }))
      })
    })
  }

  useEffect(() => {
    const removePresenceListeners = initPresenceListeners()
    goOnline()
    return () => {
      removePresenceListeners()
      removeAllUserListeners()
      goOffline()
    }
  }, [])
  
  return (
    <Provider value={{
      onlineUsers,
      storedUsers,
      addToStoredUsers
    }} >
      {children}
    </Provider>
  )
}

export { context as presenceContext, ContextProvider as PresenceContextProvider }