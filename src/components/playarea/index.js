import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { FlexContainer, WidthContainer, AspectRatioContainer, PlayContainer, Image } from './styles'

export default function Playarea({ children, ...restProps }) {
  const containerRef = useRef()

  let maxWidth
  if (containerRef && containerRef.current) {
    maxWidth = containerRef.current.parentElement.clientHeight
  }

  return (
    <FlexContainer ref={containerRef} {...restProps}>
      <WidthContainer maxWidth={maxWidth}>
        <AspectRatioContainer>
          <PlayContainer>
            {children}
          </PlayContainer>
        </AspectRatioContainer>
      </WidthContainer>
    </FlexContainer>
    // <div>
    //   <div style={{height: '550px', width: '550px', background: 'blue'}}>
    //   </div>
    //   <div style={{height: '250px', width: '250px', background: 'orange'}}>
    //   </div>
    // </div>
  )
}

Playarea.Image = function PlayareaImage({ src, ...restProps }) {
  return <Image src={src} { ...restProps }/>
}