import React, { useContext, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Chat } from '../components'
import { chatContext } from '../context/chat'
import { presenceContext } from '../context/presence'
import { firebaseContext } from '../context/firebase'

export default function ChatContainer({ onFocus = () => {}, isExpanded = false }) {
  const { user } = useContext(firebaseContext)
  const { sendMessage, messages } = useContext(chatContext)
  const { onlineUsers, storedUsers } = useContext(presenceContext)
  const [allMessages, setAllMessages] = useState([])
  const [isUsersListExpanded, setIsUsersListExpanded] = useState(true)
  const inputRef = useRef()
  const logRef = useRef()
  const [text, setText] = useState('')

  const numOnline = onlineUsers.length
  const userListHeading = `${numOnline} User${numOnline > 1 ? 's' : ''} Online`

  const handleSubmit = event => {
    event.preventDefault()
    inputRef.current.focus()
    if (text.length < 1) return
    sendMessage(text)
    setText('')
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  useEffect(() => {
    setAllMessages(
      messages.map(message => {
        const storedUser = storedUsers[message.uid]
        const displayName = storedUser && storedUser.displayName
        const color = storedUser && storedUser.color

        return {
          ...message,
          displayName,
          color
        }
      })
    )
  }, [messages, storedUsers])

  useEffect(() => {
    const container = logRef.current
    if (container && container.lastChild) {
      const lastMessageAuthor = allMessages[allMessages.length - 1].uid
      const scrollAmount = container.scrollHeight - container.clientHeight - container.scrollTop
      if (scrollAmount < 100 || lastMessageAuthor === user.uid) {
        container.lastChild.scrollIntoView()
      }
    }
  }, [allMessages, user.uid])

  return (
    <Chat>
      <Chat.Form onSubmit={handleSubmit}>
        <Chat.TextInput
          ref={inputRef}
          maxLength={150}
          onKeyPress={handleKeyPress}
          onFocus={onFocus}
          value={text}
          onChange={event => setText(event.target.value)}
        />
        <Chat.Send>Send</Chat.Send>
      </Chat.Form>
      <Chat.Log ref={logRef} isExpanded={isExpanded}>
        {allMessages.map(message => (
          <Chat.Message key={message.id}>
            <Chat.Timestamp>{message.timestamp}</Chat.Timestamp>
            <Chat.Sender color={message.color}>{message.displayName}</Chat.Sender>
            <Chat.Text>{message.message}</Chat.Text>
          </Chat.Message>
        ))}
      </Chat.Log>
      <Chat.Section isExpanded={isExpanded}>
        <Chat.Heading onClick={() => setIsUsersListExpanded(prev => !prev)}>
          {userListHeading}
        </Chat.Heading>
        <Chat.List
          isExpanded={isUsersListExpanded}
          className="scrollbox"
          style={{ '--bg-color': '#1e1e1e', '--shadow-color': '#00000040' }}
        >
          {onlineUsers.map(uid => (
            <Chat.User key={uid} color={storedUsers[uid] && storedUsers[uid].color}>
              {storedUsers[uid] && storedUsers[uid].displayName}
            </Chat.User>
          ))}
        </Chat.List>
      </Chat.Section>
    </Chat>
  )
}

ChatContainer.propTypes = {
  onFocus: PropTypes.func,
  isExpanded: PropTypes.bool
}
