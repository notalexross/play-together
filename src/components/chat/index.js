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
  Text,
  Section,
  List,
  User,
  Heading,
  HeadingInner
} from './styles'

export default function Chat({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}

Chat.Send = function ChatSend({ children, ...restProps }) {
  return (
    <SendWrapper>
      <Send {...restProps}>{children}</Send>
    </SendWrapper>
  )
}

Chat.TextInput = React.forwardRef(({ value, maxLength = 100, ...restProps }, ref) => {
  const [error, setError] = useState('')
  const prevScrollHeight = useRef()
  const rowCount = useRef(1)

  prevScrollHeight.current = ref.current && ref.current.scrollHeight

  useEffect(() => {
    setError(error =>
      !error && value.length === maxLength ? `Reached ${maxLength} Character Limit` : ''
    )
  }, [value, maxLength, setError])

  if (value.length === 0) {
    rowCount.current = 1
  } else {
    if (
      ref.current &&
      rowCount.current < 3 &&
      ref.current.scrollHeight > prevScrollHeight.current
    ) {
      rowCount.current++
    }
  }

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
        {...restProps}
      />
    </>
  )
})

Chat.TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.number
}

Chat.Log = React.forwardRef(({ children, isExpanded = false, ...restProps }, ref) => {
  return (
    <Log isExpanded={isExpanded}>
      <LogInner ref={ref} {...restProps}>
        {children}
      </LogInner>
    </Log>
  )
})

Chat.Log.propTypes = {
  isExpanded: PropTypes.bool
}

Chat.Message = function ChatMessage({ children, ...restProps }) {
  return <Message {...restProps}>{children}</Message>
}

Chat.Timestamp = function ChatTimestamp({ children, ...restProps }) {
  return <Timestamp {...restProps}>{children}</Timestamp>
}

Chat.Sender = function ChatSender({ children, color, ...restProps }) {
  return (
    <Sender color={color} {...restProps}>
      {children}
    </Sender>
  )
}

Chat.Sender.propTypes = {
  color: PropTypes.string
}

Chat.Text = function ChatText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>
}

Chat.Form = function ChatForm({ children, ...restProps }) {
  return <Form {...restProps}>{children}</Form>
}

Chat.Section = function ChatSection({ children, isExpanded, ...restProps }) {
  return (
    <Section isExpanded={isExpanded} {...restProps}>
      {children}
    </Section>
  )
}

Chat.List = function ChatList({ children, ...restProps }) {
  return <List {...restProps}>{children}</List>
}

Chat.Heading = function ChatHeading({ children, ...restProps }) {
  return (
    <Heading {...restProps}>
      <HeadingInner>{children}</HeadingInner>
    </Heading>
  )
}

Chat.User = function ChatUser({ children, color, ...restProps }) {
  return (
    <User color={color} {...restProps}>
      {children}
    </User>
  )
}

Chat.User.propTypes = {
  color: PropTypes.string
}
