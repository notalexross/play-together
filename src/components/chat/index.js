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

Chat.TextInput = React.forwardRef(({ padding, value, ...restProps }, ref) => {
  const [ error, setError ] = useState('')
  const prevScrollHeight = useRef()
  const rowCount = useRef(1)
  const maxLength = 200

  useEffect(() => {
    !error && value.length === maxLength ?
      setError(`Reached ${maxLength} Character Limit`) :
      setError('')
  }, [value])

  if (value.length === 0) {
    rowCount.current = 1
  } else {
    ref.current && rowCount.current < 3 && ref.current.scrollHeight > prevScrollHeight.current && rowCount.current++
  }

  prevScrollHeight.current = ref.current && ref.current.scrollHeight

  return (
    <>
      {error ? <Error>{error}</Error> : null}
      <TextInput 
        ref={ref}
        value={value}
        rows={rowCount.current}
        ariaLabel="Send a message"
        placeholder="Send a message"
        maxLength={maxLength}
        padding={padding}
        {...restProps}
      />
    </>
  )
})

Chat.Log = React.forwardRef(({ children, isExpanded, ...restProps }, ref) => {
  return (
    <Log isExpanded={isExpanded}>
      <LogInner ref={ref} {...restProps}>
        {children}
      </LogInner>
    </Log>
  )
})

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
  return <Form {...restProps}>{children}</Form>
}
