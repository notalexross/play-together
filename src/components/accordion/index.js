import React, { useState, useContext } from 'react'
/* eslint-disable import/no-extraneous-dependencies */
import { ChevronRight } from '@styled-icons/boxicons-regular/ChevronRight'
import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown'
/* eslint-enable import/no-extraneous-dependencies */
import { Container, Item, Header, Body, BodyInner, IconWrapper } from './styles'

const ToggleContext = React.createContext()

export default function Accordion({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}

Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const [toggleShow, setToggleShow] = useState(false)

  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <Item {...restProps}>{children}</Item>
    </ToggleContext.Provider>
  )
}

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  const { toggleShow, setToggleShow } = useContext(ToggleContext)

  return (
    <Header onClick={() => setToggleShow(!toggleShow)} {...restProps}>
      <IconWrapper>{toggleShow ? <ChevronDown /> : <ChevronRight />}</IconWrapper>
      {children}
    </Header>
  )
}

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const { toggleShow } = useContext(ToggleContext)

  return toggleShow ? (
    <Body>
      <BodyInner {...restProps}>{children}</BodyInner>
    </Body>
  ) : null
}
