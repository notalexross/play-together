// TODO
import React from 'react'
import PropTypes from 'prop-types'
import { Container, HomeLink, User, UserNickname, Info, Options } from './styles'

export default function Room({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}

Room.HomeLink = function RoomUserHomeLink({ children, ...restProps }) {
  return <HomeLink {...restProps}>{children}</HomeLink>
}

Room.User = function RoomUser({ children, ...restProps }) {
  return <User {...restProps}>{children}</User>
}

Room.UserNickname = function RoomUserNickname({ children, ...restProps }) {
  return <UserNickname {...restProps}>{children}</UserNickname>
}

Room.Info = function RoomInfo({ children, ...restProps }) {
  return <Info {...restProps}>{children}</Info>
}

Room.Options = function RoomOptions({ children, ...restProps }) {
  return <Options {...restProps}>{children}</Options>
}