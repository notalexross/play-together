import React from 'react'
import { Container, Title, Text, Button } from './styles'

export default function Feature({ children, ...restProps }) {
  return (
    <Container {...restProps}>
      {children}
    </Container>
  )
}

Feature.Title = function FeatureTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>
}

Feature.Text = function FeatureText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>
}

Feature.Button = function FeatureButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>
}