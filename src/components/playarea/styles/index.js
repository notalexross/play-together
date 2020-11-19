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
  background: goldenrod;
  position: relative;
  width: 100%;
  padding-top: ${({ ratio }) => ratio * 100}%;
`

export const PlayContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // overflow: auto;

  background: green;

  display: flex;
  flex-direction: ${({ direction }) => direction};

`

export const Board = styled.div`
  // border: solid 10px blue;
  padding: 1rem;
  background: grey;
  // box-sizing: border-box;
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Pieces = styled.div`
  background: red;
  border: solid blue 20px;
  min-width: 10%;
  min-height: 10%;
  padding: 1rem;
  // flex-grow: 1;

  // display: grid;
`

export const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`