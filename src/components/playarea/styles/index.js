// TODO
import styled from 'styled-components'

export const FlexContainer = styled.div`
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`

export const WidthContainer = styled.div`
  width: 100%;
`

export const AspectRatioContainer = styled.div`
  background: #252525;
  position: relative;
  width: 100%;
  padding-top: ${({ ratio }) => ratio * 100}%;
`

export const AspectRatioInner = styled.div`
  background: black;
  // background: blue;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  padding: 3%;
`

export const PlayContainer = styled.div`
  background: #252525;
  box-sizing: border-box;
  padding: 3%;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: ${({ direction }) => direction};
`

export const Board = styled.div`
  padding: 3%;
  background: #1e1e1e;
  box-shadow: inset 0 0 5px black;
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const PiecesContainer = styled.div`
  background: #252525;
  // background: red;
  min-width: 20%;
  min-height: 20%;
  padding-${({ isVertical }) => isVertical ? 'top' : 'left'}: 3%;
  // box-sizing: border-box;
`

export const Pieces = styled.div`
  background: #1e1e1e;
  box-shadow: inset 0 0 5px black;
  width: 100%;
  height: 100%;

  // display: grid;
`

export const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 5px black);
`