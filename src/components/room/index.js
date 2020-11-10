// TODO
import React from 'react'
import PropTypes from 'prop-types'
import { Container, Panel } from './styles'

export default function Room({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}

Room.Panel = function RoomUserPanel({ children, ...restProps }) {
  return <Panel {...restProps}>{children}</Panel>
}
