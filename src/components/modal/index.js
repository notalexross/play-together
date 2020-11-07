import React, { useContext, useEffect } from 'react'
import { Container, Overlay, Close, Title, Text, Form, Submit, InputText } from './styles'
import { CloseCircle as CloseCircleEmpty } from '@styled-icons/remix-line'
import { CloseCircle as CloseCircleFilled } from '@styled-icons/remix-fill'
import { modalsContext } from '../../context/modalsContext'
import useHover from '../../hooks/useHover'

export default function Modal({ children, ...restProps }) {
  return (
      <Overlay {...restProps}>
        <Container>
          {children}
        </Container>
      </Overlay>
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
  const { setCurrentModal } = useContext(modalsContext)
  const [ isHovered, hoverRef ] = useHover()

  const closeModal = () => setCurrentModal()

  useEffect(() => {
    const handleKeyPress = event => {
      if(event.key === 'Escape' || event.keyCode === 27) closeModal()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <Close ref={hoverRef} onClick={closeModal} {...restProps}>
      {isHovered ? <CloseCircleFilled/> : <CloseCircleEmpty/>}
    </Close>
  )
}