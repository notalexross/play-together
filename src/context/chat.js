import React, { useContext, useEffect, useState, useRef, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { firebaseContext } from './firebase'
import { presenceContext } from './presence'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { user, firebase } = useContext(firebaseContext)
  const { addToStoredUsers } = useContext(presenceContext)
  const { roomId } = useParams()
  const [messages, setMessages] = useState([])
  const isFirstSnapshot = useRef(true)
  // WARNING: This uses client local time, so susceptible to user just setting system clock backwards.
  // if client clock is slow by more than 5 seconds then it won't see messages initially at all.
  const timeJoined = useRef(firebase.firestore.Timestamp.fromDate(new Date(Date.now() - 5000)))

  const firestore = firebase.firestore()
  const roomRef = useMemo(() => firestore.collection('rooms').doc(roomId), [firestore, roomId])
  const messagesRef = useMemo(() => roomRef.collection('messages'), [roomRef])

  const sendMessage = message => {
    messagesRef.add({
      uid: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      content: message
    })
  }

  useEffect(() => {
    const initMessaging = () => {
      const query = messagesRef
        .where('createdAt', '>', timeJoined.current)
        .orderBy('createdAt', 'desc')
        .limit(500)

      const newMessageListener = query.onSnapshot(snapshot => {
        const isLocalUpdate = snapshot.docs.some(doc => doc.metadata.hasPendingWrites)
        if (isLocalUpdate) return

        if (isFirstSnapshot.current) {
          isFirstSnapshot.current = false
          const uids = [...new Set(snapshot.docs.map(doc => doc.data().uid))]
          addToStoredUsers(uids)
        }

        setMessages(
          snapshot.docs.reverse().map(doc => {
            const { id } = doc
            const { uid, content } = doc.data()
            const time = doc.data().createdAt.toDate()
            const hours = time.getHours().toString().padStart(2, '0').slice(0, 2)
            const minutes = time.getMinutes().toString().padStart(2, '0').slice(0, 2)

            return {
              id,
              uid,
              timestamp: `${hours}:${minutes}`,
              message: content
            }
          })
        )
      })

      return newMessageListener
    }

    return initMessaging()
  }, [addToStoredUsers, messagesRef])

  return <Provider value={{ sendMessage, messages }}>{children}</Provider>
}

export { context as chatContext, ContextProvider as ChatContextProvider }
