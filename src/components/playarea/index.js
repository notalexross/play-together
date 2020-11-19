import React, { useRef, useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { FlexContainer, WidthContainer, AspectRatioContainer, AspectRatioInner, PlayContainer, Board, Image, PiecesContainer, Pieces } from './styles'

const OrientationContext = React.createContext()

export default function Playarea({ children, ...restProps }) {
  const [ maxWidth, setMaxWidth ] = useState(0)
  const [ isVertical, setIsVertical ] = useState(false)
  const containerRef = useRef()

  const ratio = isVertical ? 1.33 : 0.75 // TODO
  const smallWidth = 800 // TODO

  let parentHeight, parentWidth, parent
  if (containerRef && containerRef.current) {
    parent = containerRef.current.parentElement
    parentHeight = containerRef.current.parentElement.clientHeight
    parentWidth = containerRef.current.parentElement.clientWidth
  }

  useEffect(() => {
    setIsVertical(parentWidth <= parentHeight)
    setMaxWidth(parentHeight / ratio)
  }, [parentHeight, parentWidth, ratio])

  return (
    <OrientationContext.Provider value={{ isVertical }}>
      <FlexContainer ref={containerRef} {...restProps}>
        <WidthContainer style={{maxWidth: `${maxWidth}px`}}>
          <AspectRatioContainer ratio={ratio}>
            <AspectRatioInner>
              <PlayContainer direction={isVertical ? 'column' : 'row'}>
                {children}
              </PlayContainer>
            </AspectRatioInner>
          </AspectRatioContainer>
        </WidthContainer>
      </FlexContainer>
    </OrientationContext.Provider>
  )
}

Playarea.Board = function PlayareaBoard({ game = 'chess', ...restProps }) {
  return <Board {...restProps}>
    <Image src={`/images/boards/${game}.png`}/>
  </Board>
}

Playarea.Pieces = function PlayareaPieces({ game = 'chess', ...restProps }) {
  const { isVertical } = useContext(OrientationContext)

  return (
    <PiecesContainer isVertical={isVertical}>
      <Pieces {...restProps}>
        
      </Pieces>
    </PiecesContainer>
  )
}