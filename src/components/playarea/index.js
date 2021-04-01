import React, { useRef, useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  FlexContainer,
  AspectRatioContainer,
  PlayContainer,
  Board,
  BoardPiecesOuter,
  BoardPiecesContainer,
  PiecesContainer,
  PiecesWrapper,
  PiecesInner
} from './styles'
import Svg from '../../svgs'
import PlayareaContext from '../../context/playarea'

export default function Playarea({
  children,
  aspectRatio = 0.75,
  paddingFraction = 0.03,
  rotation = 0,
  ...restProps
}) {
  const [isVertical, setIsVertical] = useState(false)
  const [padding, setPadding] = useState(0)
  const [playWidth, setPlayWidth] = useState(0)
  const [playHeight, setPlayHeight] = useState(0)
  const [basis, setBasis] = useState(0)
  const containerRef = useRef()

  const ratio = isVertical ? 1 / aspectRatio : aspectRatio

  let parentHeight
  let parentWidth
  let parent
  if (containerRef && containerRef.current) {
    parent = containerRef.current.parentElement
    parentHeight = containerRef.current.parentElement.clientHeight
    parentWidth = containerRef.current.parentElement.clientWidth
  }

  useEffect(() => {
    if (parentWidth && parentHeight) {
      let width = parentWidth
      let height = ratio * width
      height = Math.min(height, parentHeight)
      width = height / ratio
      const size = Math.min(width, height)

      setPlayWidth(width)
      setPlayHeight(height)
      setBasis(size)
      setPadding(paddingFraction * size)
      setIsVertical(parentWidth <= parentHeight)
    }
  }, [parent, parentHeight, parentWidth, ratio, paddingFraction])

  return (
    <PlayareaContext.Provider value={{ isVertical, basis, padding, rotation }}>
      <FlexContainer ref={containerRef} {...restProps}>
        <AspectRatioContainer
          style={{ width: `${playWidth}px`, height: `${playHeight}px`, padding: `${padding}px` }}
        >
          <PlayContainer
            style={{ padding: `${padding}px` }}
            direction={isVertical ? 'column' : 'row'}
            onContextMenu={e => e.preventDefault()}
            onDragStart={e => e.preventDefault()}
          >
            {children}
          </PlayContainer>
        </AspectRatioContainer>
      </FlexContainer>
    </PlayareaContext.Provider>
  )
}

Playarea.propTypes = {
  aspectRatio: PropTypes.number,
  paddingFraction: PropTypes.number,
  rotation: PropTypes.number
}

Playarea.Board = function PlayareaBoard({
  children,
  game = 'chess',
  color = 'white',
  paddingFraction = 0.06,
  ...restProps
}) {
  // paddingFraction is relative to aspect ratio container, not board container
  const { basis, padding, rotation } = useContext(PlayareaContext)

  const boardPadding = paddingFraction * basis
  const boardSize = basis - 4 * padding

  const boardStyle = {
    padding: `${boardPadding}px`,
    height: `${boardSize}px`,
    width: `${boardSize}px`
  }

  const svgStyle = {
    height: '100%', // comment this when fixing size of svg
    width: '100%',
    filter: `drop-shadow(0 0 ${basis * 0.002}px white) drop-shadow(0 0 ${basis * 0.005}px black)`,
    transform: `rotate(${-rotation}deg)`
  }

  return (
    <Board style={boardStyle} {...restProps}>
      <Svg type="board" game={game} color={color} style={svgStyle} />
      {children}
    </Board>
  )
}

Playarea.Board.propTypes = {
  game: PropTypes.string,
  color: PropTypes.string,
  paddingFraction: PropTypes.number
}

Playarea.BoardPiecesContainer = React.forwardRef(({ ...restProps }, ref) => (
  <BoardPiecesOuter>
    <BoardPiecesContainer ref={ref} {...restProps} />
  </BoardPiecesOuter>
))

Playarea.Pieces = function PlayareaPieces({ children, ...restProps }) {
  const { isVertical, padding } = useContext(PlayareaContext)

  let containerStyle
  if (isVertical) {
    containerStyle = { paddingTop: `${padding}px` }
  } else {
    containerStyle = { paddingLeft: `${padding}px` }
  }

  return (
    <PiecesContainer style={containerStyle}>
      <PiecesWrapper {...restProps}>
        <PiecesInner
          style={{
            padding: `${padding}px`,
            gridGap: `${padding / 2}px`,
            flexDirection: isVertical ? 'column' : 'row'
          }}
        >
          {children}
        </PiecesInner>
      </PiecesWrapper>
    </PiecesContainer>
  )
}

Playarea.Piece = function PlayareaPiece({
  style = {},
  game,
  name,
  color,
  sizeFraction = 0.1,
  holderColor = undefined,
  ...restProps
}) {
  const { basis } = useContext(PlayareaContext)
  const svgRef = useRef()

  const pieceSize = basis * sizeFraction
  const holderColorRadius = basis * 0.003

  let highlight
  if (holderColor) {
    highlight = `
      drop-shadow(0 0 ${holderColorRadius}px ${holderColor})
      drop-shadow(0 0 ${holderColorRadius}px ${holderColor})
      drop-shadow(0 0 ${holderColorRadius}px ${holderColor})
    `
  } else {
    highlight = `
      drop-shadow(0 0 ${basis * 0.002}px white)
      drop-shadow(0 0 ${basis * 0.005}px black)
    `
  }

  const pieceStyle = {
    height: `${pieceSize}px`,
    filter: highlight,
    cursor: 'grab',
    pointerEvents: 'none',
    touchAction: 'none' // prevents screen scroll whilst dragging pieces
  }

  useEffect(() => {
    const innerSvg = svgRef.current.querySelector('g') || svgRef.current.querySelector('path')
    innerSvg.style.pointerEvents = 'all'
  }, [])

  return (
    <Svg
      type="piece"
      game={game}
      name={name}
      color={color}
      style={{ ...pieceStyle, ...style }}
      ref={svgRef}
      {...restProps}
    />
  )
}

Playarea.Piece.propTypes = {
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  game: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  sizeFraction: PropTypes.number,
  holderColor: PropTypes.string
}
