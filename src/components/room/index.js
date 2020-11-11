// TODO
import React from 'react'
import PropTypes from 'prop-types'
import { Container } from './styles'

export default function Room({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}