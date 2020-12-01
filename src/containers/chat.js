import React, { useContext, useState, useRef, useEffect } from 'react'
import { Chat } from '../components'
import { chatContext } from '../context/chat'

export default function ChatContainer({ onFocus = () => {}, isExpanded }) {
  const { sendMessage, messages, storedUsers } = useContext(chatContext)
  const [ allMessages, setAllMessages ] = useState([])
  const inputRef = useRef()
  const logRef = useRef()
  const [ text, setText ] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    inputRef.current.focus()
    if (text.length < 1) return
    sendMessage(text)
    setText('')
    logRef.current && logRef.current.lastChild && logRef.current.lastChild.scrollIntoView()
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  useEffect(() => {
    setAllMessages(messages.map(message => {
      const storedUser = storedUsers[message.uid]
      const displayName = storedUser && storedUser.displayName
      const color = storedUser && storedUser.color
      return {
        ...message,
        displayName,
        color
      }
    }))
  }, [messages, storedUsers])

  return (
    <Chat>
      <Chat.Form onSubmit={handleSubmit}>
        <Chat.TextInput ref={inputRef} onKeyPress={handleKeyPress} onFocus={onFocus} value={text} onChange={event => setText(event.target.value)}/>
        <Chat.Send>Send</Chat.Send>
      </Chat.Form>
      <Chat.Log ref={logRef} isExpanded={isExpanded}>
        {allMessages.map(message => (
          <Chat.Message key={message.id}>
            <Chat.Timestamp>
              {message.timestamp}
            </Chat.Timestamp>
            <Chat.Sender color={message.color}>
              {message.displayName}
            </Chat.Sender>
            <Chat.Text>
              {message.message}
            </Chat.Text>
          </Chat.Message>
        ))}
      </Chat.Log>
    </Chat>
  )
}