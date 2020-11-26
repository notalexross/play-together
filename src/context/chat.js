import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { firebaseContext } from '../context/firebase'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { user, firebase } = useContext(firebaseContext)
  const { roomId } = useParams()
  const [ messages, setMessages ] = useState([])
  const [ storedUsers, setStoredUsers ] = useState([])
  // TODO this uses client local time, so susceptible to user just setting system clock backwards.
  // if client clock is slow by more than 5 seconds then it won't see messages initially at all.
  const timeJoined = useRef(firebase.firestore.Timestamp.fromDate(new Date(Date.now() - 5000)))

  const sendMessage = message => {
    console.log('sending message')
    console.log(roomId)
    const roomRef = firebase.firestore().collection('rooms').doc(roomId)
    const messagesRef = roomRef.collection('messages')
    messagesRef.add({
      uid: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      content: message
    })
  }

  const initMessaging = () => {
    const listeners = []


    // TODO This is very dodgy stuff...
    const updateStoredUsers = data => {
      setStoredUsers(storedUsers => {
        if (!storedUsers.some(storedUser => storedUser.uid === data.uid)) {
          const usersRef = firebase.firestore().collection('users')
          const query = usersRef.doc(data.uid)
          console.log('adding new user listener')
          const newListener = query.onSnapshot(snapshot => {
            if (snapshot.metadata.hasPendingWrites) return
            // if (!snapshot.exists) return
            const updatedUser = {
              uid: data.uid,
              displayName: snapshot.data().displayName,
              color: snapshot.data().color
            }
            setStoredUsers(storedUsers => ([
              ...storedUsers.filter(storedUser => storedUser.uid !== updatedUser.uid),
              updatedUser
            ]))
          })
          listeners.push(newListener)
        }
        return storedUsers
      })
    }

    console.log('initialising messaging')
    const roomRef = firebase.firestore().collection('rooms').doc(roomId)
    const messagesRef = roomRef.collection('messages')
    const query = messagesRef.where('createdAt', '>', timeJoined.current).orderBy('createdAt', 'desc').limit(100)
    listeners[0] = query.onSnapshot(snapshot => {
      if (snapshot.docs.some(doc => doc.metadata.hasPendingWrites)) return // this should prevent triggering twice locally
      console.log('updating messages')
      setMessages(snapshot.docs.reverse().map(doc => {
        updateStoredUsers(doc.data())
        const time = doc.data().createdAt.toDate()
        const hours = time.getHours().toString().padStart(2,'0').slice(0,2)
        const minutes = time.getMinutes().toString().padStart(2,'0').slice(0,2)
        return {
          id: doc.id,
          uid: doc.data().uid,
          timestamp: `${hours}:${minutes}`,
          message: doc.data().content
        }
      }))
    })

    return listeners
  }

  useEffect(() => {
    const listeners = initMessaging()
    return () => {
      listeners.forEach(listener => listener())
      console.log(listeners)
    }
  }, [])

  return (
    <Provider value={{ sendMessage, messages, storedUsers }} >
      {children}
    </Provider>
  )
}

export { context as chatContext, ContextProvider as ChatContextProvider }