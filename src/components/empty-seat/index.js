import React from 'react'
import PropTypes from 'prop-types'
import { Container } from './styles'

export default function EmptySeat({ children, ...restProps }) {
  return (
    <Container {...restProps}>{children}</Container>
  )
}