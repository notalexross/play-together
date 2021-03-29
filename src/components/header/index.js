import React from 'react'
import { Container, HomeLink, Text, TextCopy, Wrapper } from './styles'

export default function Header({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}

Header.HomeLink = function HeaderUserHomeLink({ children, ...restProps }) {
  return <HomeLink {...restProps}>{children}</HomeLink>
}

Header.Text = function HeaderText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>
}

Header.TextCopy = function HeaderTextCopy({ children, ...restProps }) {
  return (
    <TextCopy {...restProps}>
      {children}
    </TextCopy>
  )
}

Header.Wrapper = function HeaderWrapper({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>
}