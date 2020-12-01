import React, { useRef, useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { FlexContainer, AspectRatioContainer, PlayContainer, Board, BoardPiecesOuter, BoardPiecesContainer, Image, PiecesContainer, PiecesWrapper, PiecesInner } from './styles'
import Svg from '../../svgs'

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
          <PlayContainer style={{padding: `${padding}px`}} direction={isVertical ? 'column' : 'row'} onContextMenu={e => e.preventDefault()} onDragStart={e => e.preventDefault()}>
            {children}
          </PlayContainer>
        </AspectRatioContainer>
      </FlexContainer>
    </PlayareaContext.Provider>
  )
}

Playarea.Board = function PlayareaBoard({ children, game = 'chess', color = 'white', paddingFraction = 0.06, ...restProps }) {
  // paddingFraction is relative to aspect ratio container, not board container
  const { basis, padding } = useContext(PlayareaContext)

  const boardPadding = paddingFraction * basis
  const boardSize = basis - 4 * padding

  const boardStyle = {
    padding: `${boardPadding}px`,
    height: `${boardSize}px`,
    width: `${boardSize}px`,
  }

  const svgStyle = {
    height: '100%', // comment this when fixing size of svg
    width: '100%',
    filter: `drop-shadow(0 0 ${basis * 0.002}px white) drop-shadow(0 0 ${basis * 0.005}px black)`,
    // background: 'purple',
  }

  return (
    <Board style={boardStyle} {...restProps}>
      <Svg type="board" game={game} color={color} style={svgStyle}/>
      {children}
    </Board>
  )
}

Playarea.BoardPiecesContainer = React.forwardRef(({ ...restProps }, ref) => {
  return (
    <BoardPiecesOuter>
      <BoardPiecesContainer ref={ref} {...restProps} />
    </BoardPiecesOuter>
  )
})

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
        <PiecesInner style={{padding: `${padding}px`, gridGap: `${padding / 2}px`, flexDirection: isVertical ? 'column' : 'row'}}>
          {children}
        </PiecesInner>
      </PiecesWrapper>
    </PiecesContainer>
  )
}

Playarea.Piece = function PlayareaPiece({ style, game, name, color, sizeFraction = 0.1, ...restProps }) {
  const { basis } = useContext(PlayareaContext)
  const svgRef = useRef()

  const pieceSize = basis * sizeFraction

  const pieceStyle = {
    height: `${pieceSize}px`,
    // width: `${pieceSize}px`,
    filter: `drop-shadow(0 0 ${basis * 0.002}px white) drop-shadow(0 0 ${basis * 0.005}px black)`,
    cursor: 'grab',
    pointerEvents: 'none',
    touchAction: 'none', // prevents screen scroll whilst dragging pieces
    // background: 'orange'
  }

  useEffect(() => {
    const innerSvg = svgRef.current.querySelector('g') || svgRef.current.querySelector('path')
    innerSvg.style.pointerEvents = 'all'
  }, [])


  return (
    <Svg type="piece" game={game} name={name} color={color} style={{...pieceStyle, ...style}} ref={svgRef} {...restProps}/>
  )
}