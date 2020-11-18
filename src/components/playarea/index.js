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
      <WidthContainer style={{maxWidth: `${maxWidth}px`}}>
        <AspectRatioContainer>
          <PlayContainer>
            {children}
          </PlayContainer>
        </AspectRatioContainer>
      </WidthContainer>
    </FlexContainer>
  )
}

Playarea.Image = function PlayareaImage({ src, ...restProps }) {
  return <Image src={src} { ...restProps }/>
}