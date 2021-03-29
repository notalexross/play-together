import React, { useState, useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { firebaseContext } from '../context/firebase'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { user } = useContext(firebaseContext)
  const { roomId } = useParams()
  const [onlineUsers, setOnlineUsers] = useState([])
  const [storedUsers, setStoredUsers] = useState({})
  const userListeners = useRef({})
  const timeout = useRef()

  const firebase = window.firebase
  const database = firebase.database()
  const firestore = firebase.firestore()
  const roomRef = database.ref(`rooms/${roomId}`)
  const onlineUsersRef = roomRef.child('users')
  const usersRef = firestore.collection('users')
  const userRef = onlineUsersRef.child(user.uid)
  const connectionsRef = userRef.child('connections')
  const connectedRef = database.ref('.info/connected')

  const alertError = error => {
    error && alert(error)
    error && console.error(error)
  }

  const goOnline = () => {
    connectedRef.on(
      'value',
      snap => {
        console.log(new Date())

        if (snap.val() === true) {
          const connection = connectionsRef.push()
          connection
            .onDisconnect()
            .remove(err => err && console.error('could not establish onDisconnect event', err))
            .then(() => {
              connection.set(true)
              console.log('going online: tracking presence')
            })
        } else {
          console.log('connection lost')
        }
      },
      alertError
    )
    database.goOnline()
  }

  const goOffline = () => {
    database.goOffline()
    connectedRef.off()
    console.log('going offline')
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

        setOnlineUsers(users => users.filter(user => user !== snapshot.key))
        removeUserListener(snapshot.key)
      },
      alertError
    )
  }

  const addUserListener = uid => {
    if (userListeners.current && userListeners.current[uid]) return

    const query = usersRef.doc(uid)
    const newListener = query.onSnapshot(snapshot => {
      if (snapshot.metadata.hasPendingWrites) return
      if (!snapshot.data()) return

      console.log(`updating user: ${uid}`)
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
    Object.keys(userListeners.current).forEach(uid => {
      removeUserListener(uid)
    })
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
    initPresenceListeners()
    console.log('mounting presence listeners')
    goOnline()
    
    return () => {
      onlineUsersRef.off()
      removeAllUserListeners()
      goOffline()
    }
  }, [])

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
