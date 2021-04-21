import styled from 'styled-components'

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background-color: black;
  overflow: hidden;
`

export const AspectRatioContainer = styled.div`
  box-sizing: border-box;
  background-color: black;
`

export const PlayContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #252525;
`

export const Board = styled.div`
  position: relative;
  box-sizing: border-box;
  background-color: #1e1e1e;
  box-shadow: inset 0 0 5px black;
`

export const BoardPiecesOuter = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const BoardPiecesContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const PiecesContainer = styled.div`
  flex-grow: 1;
  background-color: #252525;
`

export const PiecesWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #1e1e1e;
  box-shadow: inset 0 0 5px black;
  overflow: auto;
`

export const PiecesInner = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
`
