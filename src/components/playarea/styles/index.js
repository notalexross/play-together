// TODO
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  // background: #1e1e1e;
`

export const Area = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`

export const Main = styled.div`
  background: #252525;
  // border-top: solid 5px #1e1e1e;
  // box-sizing: border-box;
  // min-height: 200px;
  // max-height: 300px;
  // border: solid 1px red;
  height: 100px;
  // height: 100px;
  // flex-grow: 1;
  
  width: 100%;
  box-shadow: 0 0 10px #000;
  z-index: 1;
`

export const TableContainer = styled.div`
  // box-sizing: border-box;
  // border: solid green 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: space-evenly;

  margin-bottom: 1em;
`

export const TableWrapper = styled.div`
  // border: solid white 1px;
  width: 100%;
  display: flex;
  justify-content: center;

  height: 100%;
  position: absolute;
  // overflow: hidden;

  filter: drop-shadow(0 0 5px #000);
`

export const Table = styled.div`
  background: #444;
  border-radius: 10px;
  // height: 65%;
  height: ${({ height }) => height ? `${height}px` : '0'};
  width: 30%;
  transform-origin: top;
  transform: ${({ angle, perspective }) => angle && perspective ? `perspective(${perspective}px) rotateX(${angle}deg)` : null};

  display: flex;
  justify-content: center;
  align-items: center;
`

export const PlayersContainer = styled.div`
  // background: green;
  display: grid;
  grid-template-columns: 1fr 27% ${({ gap }) => gap} 27% 1fr;
  // align-items: center;
  width: 100%;
  // margin: 0.5em;
  // height: 30%;
  // border: solid white 1px;
  box-sizing: border-box;
  z-index: 1;
`

export const PlayerWrapper = styled.div`
  // border: solid blue 1px;
  width: fit-content;
  width: 100%;
  // height: 80px;
  // min-height: 100%;
  // padding: 0.5em;
  margin: 0.5em 0;
  // box-sizing: border-box;

  display: flex;

  &:first-child {
    // background: blue;
    grid-column-start: 2;
    justify-content: flex-end;
  }

  &:last-child {
    // background: green;
    grid-column-start: 4;
    justify-content: flex-start;
  }
`

export const Player = styled.div`
// position: absolute;
  // background: orange;
  border-radius: 10px;
  border: dashed 3px white;
  height: 80px;

  width: 100%;
  max-width: 200px;
  // width: 10px; // minmax(30px,200px); // TODO: how do I actually do this???
`