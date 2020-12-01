import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { firebaseContext } from '../context/firebase'
import { presenceContext } from '../context/presence'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { user, firebase } = useContext(firebaseContext)
  const { storedUsers, addToStoredUsers } = useContext(presenceContext)
  const { roomId } = useParams()
  const [ messages, setMessages ] = useState([])
  const isFirstSnapshot = useRef(true)
  // TODO this uses client local time, so susceptible to user just setting system clock backwards.
  // if client clock is slow by more than 60 seconds then it won't see messages initially at all.
  const timeJoined = useRef(firebase.firestore.Timestamp.fromDate(new Date(Date.now() - 60000)))

  const firestore = firebase.firestore()
  const roomRef = firestore.collection('rooms').doc(roomId)
  const messagesRef = roomRef.collection('messages')

  const sendMessage = message => {
    console.log('sending message')
    messagesRef.add({
      uid: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      content: message
    })
  }

  // TODO increase the message limit
  const initMessaging = () => {
    console.log('initialising messaging')
    const query = messagesRef.where('createdAt', '>', timeJoined.current).orderBy('createdAt', 'desc').limit(100)
    return query.onSnapshot(snapshot => {
      if (snapshot.docs.some(doc => doc.metadata.hasPendingWrites)) return // this should prevent triggering twice locally
      if (isFirstSnapshot.current) {
        isFirstSnapshot.current = false
        const uids = [ ...new Set(snapshot.docs.map(doc => doc.data().uid))]
        addToStoredUsers(uids)
      }
      console.log('updating messages')
      setMessages(snapshot.docs.reverse().map(doc => {
        const id = doc.id
        const uid = doc.data().uid
        const message = doc.data().content
        const time = doc.data().createdAt.toDate()
        const hours = time.getHours().toString().padStart(2,'0').slice(0,2)
        const minutes = time.getMinutes().toString().padStart(2,'0').slice(0,2)
        return {
          id,
          uid,
          timestamp: `${hours}:${minutes}`,
          message
        }
      }))
    })
  }

  useEffect(() => {
    return initMessaging()
  }, [])

  return (
    <Provider value={{ sendMessage, messages, storedUsers }} >
      {children}
    </Provider>
  )
}

export { context as chatContext, ContextProvider as ChatContextProvider }