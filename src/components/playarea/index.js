import React, { useRef, useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { FlexContainer, AspectRatioContainer, PlayContainer, Board, Image, PiecesContainer, PiecesWrapper, PiecesInner, Piece } from './styles'

const PlayareaContext = React.createContext()

export default function Playarea({ children, aspectRatio = 0.75, paddingFraction = 0.03, ...restProps }) {
  const [ isVertical, setIsVertical ] = useState(false)
  const [ padding, setPadding ] = useState(0)
  const [ playWidth, setPlayWidth ] = useState(0)
  const [ playHeight, setPlayHeight ] = useState(0)
  const [ basis, setBasis ] = useState(0)
  const containerRef = useRef()

  const ratio = isVertical ? (1 / aspectRatio) : aspectRatio

  let parentHeight, parentWidth, parent
  if (containerRef && containerRef.current) {
    parent = containerRef.current.parentElement
    parentHeight = containerRef.current.parentElement.clientHeight
    parentWidth = containerRef.current.parentElement.clientWidth
  }

  useEffect(() => {
    let Width = parentWidth
    let Height = ratio * Width
    Height = Math.min(Height, parentHeight)
    Width = Height / ratio
    const size = Math.min(Width, Height)
    
    setPlayWidth(Width)
    setPlayHeight(Height)
    setBasis(size)
    setPadding(paddingFraction * size)
    setIsVertical(parentWidth <= parentHeight)
  }, [parent, parentHeight, parentWidth, ratio, paddingFraction])

  return (
    <PlayareaContext.Provider value={{ isVertical, basis, padding }}>
      <FlexContainer ref={containerRef} {...restProps}>
        <AspectRatioContainer style={{width: `${playWidth}px`, height: `${playHeight}px`, padding: `${padding}px`}}>
          <PlayContainer style={{padding: `${padding}px`}} direction={isVertical ? 'column' : 'row'}>
            {children}
          </PlayContainer>
        </AspectRatioContainer>
      </FlexContainer>
    </PlayareaContext.Provider>
  )
}

Playarea.Board = function PlayareaBoard({ game = 'chess', paddingFraction = 0.06, ...restProps }) {
  // paddingFraction is relative to aspect ratio container, not board container
  const { basis, padding } = useContext(PlayareaContext)

  const boardPadding = paddingFraction * basis
  const boardSize = basis - 4 * padding

  const boardStyle = {
    padding: `${boardPadding}px`,
    height: `${boardSize}px`,
    width: `${boardSize}px`
  }

  return <Board style={boardStyle} {...restProps}>
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

Playarea.Piece = function PlayareaPiece({ children, game, filename, sizeFraction = 0.1, ...restProps }) {
  const { basis } = useContext(PlayareaContext)

  const pieceSize = basis * sizeFraction

  const pieceStyle = {
    height: `${pieceSize}px`,
    width: `${pieceSize}px`,
    filter: `drop-shadow(0 0 ${basis * 0.005}px black)`,
  }

  // return <Piece style={pieceStyle} {...restProps}></Piece>
  return <Piece src={`/images/pieces/${game}/${filename}`} style={pieceStyle} {...restProps} />
}