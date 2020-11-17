import React from 'react'
import ReactDOM from 'react-dom'
import { Container, Wrapper, Tip, Arrow } from './styles'

export default function Tooltip({
  children,
  tooltip = 'no tooltip found...',
  side = 'top',
  separation = '0.5em',
  arrowLength = '10px',
  arrowWidth = '6px',
  maxWidth = '300px',
  align = 'center', // center/flex-start/flex-end
  ...restProps
}) {



  // return (
  //   <>
  //     <Wrapper>
  //       {children}
  //     </Wrapper>
  //     {ReactDOM.createPortal(
  //       <>
  //         hi
  //       </>
  //       , document.getElementById('root')
  //     )}
  //   </>
  // )

  return (
    <Container align={align} {...restProps}>
      <Wrapper>
        {children}
      </Wrapper>
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
      </Tip>
    </Container>
  )
}