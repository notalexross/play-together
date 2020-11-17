// TODO
import React from 'react'
import PropTypes from 'prop-types'
import { Container, HomeLink, Text, TextCopy } from './styles'

export default function Header({ children, innerRef, ...restProps }) {
  return <Container ref={innerRef} {...restProps}>{children}</Container>
}

Header.HomeLink = function HeaderUserHomeLink({ children, ...restProps }) {
  return <HomeLink {...restProps}>{children}</HomeLink>
}

Header.Text = function HeaderText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>
}

Header.TextCopy = function HeaderTextCopy({ children, innerRef, ...restProps }) {
  return (
    <TextCopy ref={innerRef} {...restProps}>
        {children}
    </TextCopy>
  )
}