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
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
`

export const AspectRatioContainer = styled.div`
  background: goldenrod;
  position: relative;
  width: 100%;
  padding-top: 100%;
`

export const PlayContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export const Image = styled.img`
  height: 80%;
`