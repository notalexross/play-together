import React from 'react'
import PropTypes from 'prop-types'
import { Container, Wrapper, Tip, Arrow } from './styles'

export default function Tooltip({
  children,
  tooltip = 'no tooltip found...',
  side = 'top',
  separation = '0.5em',
  arrowLength = '10px',
  arrowWidth = '6px',
  maxWidth = '300px',
  align = 'center',
  ...restProps
}) {
  return (
    <Container align={align} {...restProps}>
      <Wrapper>{children}</Wrapper>
      <Tip
        side={side}
        separation={separation}
        arrowLength={arrowLength}
        maxWidth={maxWidth}
        align={align}
      >
        <Arrow side={side} arrowLength={arrowLength} arrowWidth={arrowWidth} />
        {tooltip}
      </Tip>
    </Container>
  )
}

Tooltip.propTypes = {
  tooltip: PropTypes.string,
  side: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  separation: PropTypes.string,
  arrowLength: PropTypes.string,
  arrowWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  align: PropTypes.oneOf(['center', 'flex-start', 'flex-end'])
}
