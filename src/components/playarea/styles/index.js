import styled from 'styled-components'

export const FlexContainer = styled.div`
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
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

  display: flex;
  justify-content: center;
  align-items: center;

  // position: relative;
`

export const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 5px black);
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
  // padding: 10%;
  box-sizing: border-box;

  position: relative;
  // border: solid 1px red;
  overflow: auto;
`

export const PiecesInner = styled.div`
  position: absolute;
  // top: 0;
  // left: 0;
  // border: solid 1px green;
  box-sizing: border-box;
  width: 100%;
  // height: 100%;

  display: flex;
  flex-wrap: wrap;


  // display: grid;
  // // grid-template-columns: repeat(auto-fill, 10%);
  
  // // grid-template-columns: repeat( auto-fit, minmax(30px, 1fr) );
  // grid-template-columns: repeat( auto-fit, minmax(30px, 1fr) );

  // justify-items: center;
  // // grid-gap: 10%;
  // // grid-auto-columns: 1fr;
`

export const Piece = styled.img`
// border: solid 1px orange;
  // border-radius: 50%;

  // margin: 5%;
  // height: 50px;
  // width: 50px;
`