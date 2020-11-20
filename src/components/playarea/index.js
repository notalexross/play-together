import React, { useRef, useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import useForceRender from '../../hooks/useForceRender.js'
import { FlexContainer, WidthContainer, AspectRatioContainer, AspectRatioInner, PlayContainer, Board, Image, PiecesContainer, PiecesWrapper, PiecesInner, Piece } from './styles'

const PlayareaContext = React.createContext()

export default function Playarea({ children, aspectRatio = 0.75, paddingFraction = 0.03, ...restProps }) {
  const [ maxWidth, setMaxWidth ] = useState(0)
  const [ isVertical, setIsVertical ] = useState(false)
  const [ padding, setPadding ] = useState(0)
  const [ basis, setBasis ] = useState(0)
  const containerRef = useRef()
  const AspectContainerRef = useRef()
  const forceRender = useForceRender() 

  const ratio = isVertical ? 1 / aspectRatio : aspectRatio

  let parentHeight, parentWidth, parent
  if (containerRef && containerRef.current) {
    parent = containerRef.current.parentElement
    parentHeight = containerRef.current.parentElement.clientHeight
    parentWidth = containerRef.current.parentElement.clientWidth
  }

  let playWidth, playHeight
  if (AspectContainerRef && AspectContainerRef.current) {
    playWidth = AspectContainerRef.current.clientWidth
    playHeight = AspectContainerRef.current.clientHeight
  }

  useEffect(() => {
    setIsVertical(parentWidth <= parentHeight)
    setMaxWidth(parentHeight / ratio)
  }, [parentHeight, parentWidth, ratio])

  useEffect(() => {
    setBasis(Math.min(playWidth, playHeight))
  }, [playWidth, playHeight])

  useEffect(() => {
    setPadding(paddingFraction * basis || 0)
  }, [basis])

  console.log('---')
  console.log(basis)
  console.log(maxWidth)

  return (
    <PlayareaContext.Provider value={{ isVertical, basis, padding }}>
      <FlexContainer ref={containerRef} {...restProps}>
        <WidthContainer style={{maxWidth: `${maxWidth}px`}}>
          <AspectRatioContainer ref={AspectContainerRef} ratio={ratio}>
            <AspectRatioInner style={{padding: `${padding}px`}}>
              <PlayContainer style={{padding: `${padding}px`}} direction={isVertical ? 'column' : 'row'}>
                {children}
              </PlayContainer>
            </AspectRatioInner>
          </AspectRatioContainer>
        </WidthContainer>
      </FlexContainer>
    </PlayareaContext.Provider>
  )
}

Playarea.Board = function PlayareaBoard({ game = 'chess', paddingFraction = 0.06, ...restProps }) {
  // paddingFraction is of aspect ratio container, not board container
  const { basis, padding } = useContext(PlayareaContext)
  const [ boardPadding, setBoardPadding ] = useState(0)
  const [ boardSize, setBoardSize ] = useState(0)
  const boardRef = useRef()

  useEffect(() => {
    setBoardPadding(paddingFraction * basis || 0)
  }, [basis])

  useEffect(() => {
    setBoardSize(basis - 4 * padding)
  }, [basis, padding])

  // const boardSize = basis - 4 * padding
  const boardStyle = {
    padding: `${boardPadding}px`,
    height: `${boardSize}px`,
    width: `${boardSize}px`
  }

  return <Board ref={boardRef} style={boardStyle} {...restProps}>
    <Image src={`/images/boards/${game}.png`}/>
  </Board>
}

Playarea.Pieces = function PlayareaPieces({ children, ...restProps }) {
  const { isVertical, padding } = useContext(PlayareaContext)

  const containerStyle = isVertical ? {
    paddingTop: `${padding}px`
  } : {
    paddingLeft: `${padding}px`
  }

  return (
    <PiecesContainer style={containerStyle}>
      <PiecesWrapper {...restProps}>
        <PiecesInner style={{padding: `${padding}px`, gridGap: `${padding / 2}px`}}>
          {children}
        </PiecesInner>
      </PiecesWrapper>
    </PiecesContainer>
  )
}

Playarea.Piece = function PlayareaPiece({ children, backgroundColor = 'firebrick', sizeFraction = 0.1, ...restProps }) {
  const { basis } = useContext(PlayareaContext)

  const pieceSize = basis * sizeFraction || 0

  const pieceStyle = {
    height: `${pieceSize}px`,
    width: `${pieceSize}px`,
    filter: `drop-shadow(0 0 ${basis * 0.005}px black)`,
    backgroundColor
  }

  return <Piece style={pieceStyle} {...restProps}></Piece>
}