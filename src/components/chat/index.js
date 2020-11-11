// TODO
import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  SendWrapper,
  Send,
  TextInput,
  Error,
  Log,
  LogInner,
  Form,
  Message,
  Timestamp,
  Sender,
  Text
} from './styles'

export default function Chat({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}

Chat.Send = function ChatSend({ children, ...restProps }) {
  return (
    <SendWrapper>
      <Send {...restProps}>
        {children}
      </Send>
    </SendWrapper>
  )
}

Chat.TextInput = function ChatTextInput({ ...restProps }) {
  const [ text, setText ] = useState('')
  const [ error, setError ] = useState('')
  const prevScrollHeight = useRef()
  const rowCount = useRef(1)
  const messageRef = useRef()
  const maxLength = 200

  useEffect(() => {
    !error && text.length === maxLength ?
      setError(`Reached ${maxLength} Character Limit`) :
      setError('')
  }, [text])

  if (text.length === 0) {
    rowCount.current = 1
  } else {
    messageRef.current && rowCount.current < 3 && messageRef.current.scrollHeight > prevScrollHeight.current && rowCount.current++
  }

  prevScrollHeight.current = messageRef.current && messageRef.current.scrollHeight

  return (
    <>
      {error ? <Error>{error}</Error> : null}
      <TextInput 
        ref={messageRef}
        value={text}
        onChange={event => setText(event.target.value)}
        onKeyPress={onKeyPress}
        rows={rowCount.current}
        ariaLabel="Send a message"
        placeholder="Send a message"
        maxLength={maxLength}
        {...restProps}
      />
    </>
  )
}

Chat.Log = function ChatLog({ children, ...restProps }) {
  return (
    <Log {...restProps}>
      <LogInner>
        {children}
      </LogInner>
    </Log>
  )
}

Chat.Message = function ChatMessage({ children, ...restProps }) {
  return <Message {...restProps}>{children}</Message>
}

Chat.Timestamp = function ChatTimestamp({ children, ...restProps }) {
  return <Timestamp {...restProps}>{children}</Timestamp>
}

Chat.Sender = function ChatSender({ children, color, ...restProps }) {
  return <Sender color={color} {...restProps}>{children}</Sender>
}

Chat.Text = function ChatText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>
}

Chat.Form = function ChatForm({ children, ...restProps }) {

  const handleSubmit = event => {
    event.preventDefault()
    postMessage()
  }
  
  return <Form onSubmit={handleSubmit} {...restProps}>{children}</Form>
}

function onKeyPress(event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    postMessage()
  }
}

function postMessage() {
  console.log('submitted message for sending')
}
