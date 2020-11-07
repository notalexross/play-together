import React, { useEffect, useContext, useRef } from 'react'
import { Container, Overlay, Close, Title, Text, Form, Submit, InputText } from './styles'
import { CloseCircle as CloseCircleEmpty } from '@styled-icons/remix-line'
import { CloseCircle as CloseCircleFilled } from '@styled-icons/remix-fill'
import useHover from '../../hooks/useHover'

const CloseContext = React.createContext()

export default function Modal({ children, close = () => {}, ...restProps }) {
  const overlayRef = useRef()

  useEffect(() => {
    const handleClick = function(event) {
      if (event.target !== this) return
      close()
    }

    overlayRef.current.addEventListener('click', handleClick)
  
    return () => {
      overlayRef.current.removeEventListener('click', handleClick)
    }
  }, [])

  return (
      <CloseContext.Provider value={{ close }}>
        <Overlay ref={overlayRef}  {...restProps}>
          <Container>
            {children}
          </Container>
        </Overlay>
      </CloseContext.Provider>
    )
}

Modal.Title = function ModalTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>
}

Modal.Text = function ModalText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>
}

Modal.Form = function ModalForm({ children, ...restProps }) {
  return <Form {...restProps}>{children}</Form>
}

Modal.Submit = function ModalSubmit({ children, ...restProps }) {
  return <Submit {...restProps}>{children}</Submit>
}

Modal.InputText = function ModalInput({ children, type='text', innerRef, ...restProps }) {
  return <InputText type={type} ref={innerRef} {...restProps}>{children}</InputText>
}

Modal.Close = function ModalClose({ children, ...restProps }) {
  const [ isHovered, hoverRef ] = useHover()
  const { close } = useContext(CloseContext)

  useEffect(() => {
    const handleKeyPress = event => {
      if(event.key === 'Escape' || event.keyCode === 27) close()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <Close ref={hoverRef} onClick={close} {...restProps}>
      {isHovered ? <CloseCircleFilled/> : <CloseCircleEmpty/>}
    </Close>
  )
}