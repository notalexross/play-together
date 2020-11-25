import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firebaseContext } from '../context/firebase'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { user, firebase, userColor } = useContext(firebaseContext)
  const { roomId } = useParams()
  const [ messages, setMessages ] = useState()
  const [ timeJoined, setTimeJoined ] = useState(firebase.firestore.Timestamp.fromDate(new Date()))
  
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
    console.log('initialising messaging')
    const roomRef = firebase.firestore().collection('rooms').doc(roomId)
    const messagesRef = roomRef.collection('messages')
    const query = messagesRef.where('createdAt', '>', timeJoined).orderBy('createdAt', 'desc') //.limit(100)
    const listener = query.onSnapshot(snapshot => {
      if(snapshot.docs.some(doc => doc.metadata.hasPendingWrites)) return // this should prevent triggering twice locally
      console.log('updating messages')
      // TODO get displayNames, and color, (only if don't already have them, update on change)
      setMessages(snapshot.docs.reverse().map(doc => {
        const time = doc.data().createdAt.toDate()
        const hours = time.getHours().toString().padStart(2,'0').slice(0,2)
        const minutes = time.getMinutes().toString().padStart(2,'0').slice(0,2)
        // TODO this wont use new values for local user userColor, since this is setup on mount only
        // it only works for displayName because the memory address never changes... but only on rerender
        return {
          id: doc.id,
          color: doc.data().uid === user.uid ? userColor : '#d46d00',
          user: doc.data().uid === user.uid ? user.displayName : 'temp',
          timestamp: `${hours}:${minutes}`,
          message: doc.data().content
        }
      }))
    })

    return listener
  }

  useEffect(() => {
    return initMessaging()
  }, [])

  // currentRoom && sendMessage('hi')

  return (
    <Provider value={{ sendMessage, messages }} >
      {children}
    </Provider>
  )
}

export { context as chatContext, ContextProvider as ChatContextProvider }