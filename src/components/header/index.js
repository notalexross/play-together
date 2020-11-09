// TODO
import React from 'react'
import PropTypes from 'prop-types'
import { Container, HomeLink, User, UserNickname, Info } from './styles'

export default function Header({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}

Header.HomeLink = function HeaderUserHomeLink({ children, ...restProps }) {
  return <HomeLink {...restProps}>{children}</HomeLink>
}

Header.User = function HeaderUser({ children, ...restProps }) {
  return <User {...restProps}>{children}</User>
}

Header.UserNickname = function HeaderUserNickname({ children, ...restProps }) {
  return <UserNickname {...restProps}>{children}</UserNickname>
}

Header.Info = function HeaderInfo({ children, ...restProps }) {
  return <Info {...restProps}>{children}</Info>
}