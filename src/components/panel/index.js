// TODO
import React from 'react'
import PropTypes from 'prop-types'
import { Container, Inner, Header, Title, Body } from './styles'

export default function Panel({ children, width, ...restProps }) { // resize = 'left' or 'right'
  return (
    <Container {...restProps}>
      <Inner width={width}>
        {children}
      </Inner>
    </Container>
  )
}

Panel.Header = function PanelHeader({ children, ...restProps }) {
  return <Header {...restProps}>{children}</Header>
}

Panel.Title = function PanelTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>
}

Panel.Body = function PanelBody({ children, ...restProps }) {
  return <Body {...restProps}>{children}</Body>
}
