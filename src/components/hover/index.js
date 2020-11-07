import React from 'react'
import { Container } from './styles'
import useHover from '../../hooks/useHover'

export default function Hover({ DefaultComponent, HoverComponent, width, noPointer, ...restProps }) {
  const [ isHovered, hoverRef ] = useHover()

  return (
    <Container ref={hoverRef} width={width} noPointer={noPointer} {...restProps}>
      {isHovered ? <HoverComponent/> : <DefaultComponent/>}
    </Container>
  )
}