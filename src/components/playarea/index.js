import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FlexContainer, WidthContainer, AspectRatioContainer, PlayContainer, Board, Image, Pieces } from './styles'

export default function Playarea({ children, ...restProps }) {
  const [ maxWidth, setMaxWidth ] = useState(0)
  const [ isSmall, setIsSmall ] = useState(false)
  const containerRef = useRef()

  const ratio = 1.5 // TODO
  const smallWidth = 800 // TODO

  let parentHeight, parentWidth, parent
  if (containerRef && containerRef.current) {
    parent = containerRef.current.parentElement
    parentHeight = containerRef.current.parentElement.clientHeight
    parentWidth = containerRef.current.parentElement.clientWidth
  }

  useEffect(() => {
    setMaxWidth(parentHeight / ratio)
  }, [parentHeight])

  useEffect(() => {
    setIsSmall(parentWidth <= smallWidth)
  }, [parentWidth])

  return (
    <FlexContainer ref={containerRef} {...restProps}>
      <WidthContainer style={{maxWidth: `${maxWidth}px`}}>
        <AspectRatioContainer ratio={ratio}>
          <PlayContainer direction='column'>
            {children}
          </PlayContainer>
        </AspectRatioContainer>
      </WidthContainer>
    </FlexContainer>
  )
}

Playarea.Board = function PlayareaBoard({ game = 'chess', ...restProps }) {
  return <Board {...restProps}>
    <Image src={`/images/boards/${game}.png`}/>
  </Board>
}

Playarea.Pieces = function PlayareaPieces({ game = 'chess', ...restProps }) {
  return <Pieces {...restProps}></Pieces>
}