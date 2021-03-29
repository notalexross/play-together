import styled from 'styled-components'

export const FlexContainer = styled.div`
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  overflow: hidden; // for pieces
`

export const AspectRatioContainer = styled.div`
  background: black;
  box-sizing: border-box;
`

export const PlayContainer = styled.div`
  background: #252525;
  box-sizing: border-box;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: ${({ direction }) => direction};
`

export const Board = styled.div`
  box-sizing: border-box;
  background: #1e1e1e;
  box-shadow: inset 0 0 5px black;
  position: relative;
`

export const BoardPiecesOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

export const BoardPiecesContainer = styled.div`
  height: 100%;
  width: 100%;
`

export const PiecesContainer = styled.div`
  background: #252525;
  flex-grow: 1;
`

export const PiecesWrapper = styled.div`
  background: #1e1e1e;
  box-shadow: inset 0 0 5px black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: auto;
`

export const PiecesInner = styled.div`
  position: absolute;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
