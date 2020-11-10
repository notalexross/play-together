import React from 'react'
import { Container, Tip, Arrow } from './styles'
import useHover from '../../hooks/useHover.js'

export default function Tooltip({
  children,
  tooltip = 'no tooltip set',
  side = 'top',
  separation = '0.5em',
  arrowLength = '10px',
  arrowWidth = '6px',
  maxWidth = '300px', // min-content
  align = 'center', // center/flex-start/flex-end
  ...restProps
}) {
  const [ isHovered, hoverRef ] = useHover()

  return (
    <Container ref={hoverRef} align={align} {...restProps}>
      {children}
      {
        isHovered ?
          <Tip
            side={side}
            separation={separation}
            arrowLength={arrowLength}
            maxWidth={maxWidth}
            align={align}
          >
            <Arrow
              side={side}
              arrowLength={arrowLength}
              arrowWidth={arrowWidth}
            />
            {tooltip}
          </Tip> :
          null
      }
    </Container>
  )
}