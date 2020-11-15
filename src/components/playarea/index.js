import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Container, Area, Main, TableContainer, TableWrapper, Table, PlayersContainer, PlayerWrapper, Player } from './styles'

export default function Playarea({ children, ...restProps }) {
  return (
    <Container {...restProps}>
      {children}
    </Container>
  )
}

Playarea.Area = function PlayareaArea({ children, ...restProps }) {
  return (
    <Area {...restProps}>
      {children}
    </Area>
  )
}

Playarea.Main = function PlayareaMain({ children, ...restProps }) {
  return (
    <Main {...restProps}>
      {children}
    </Main>
  )
}

Playarea.TableContainer = function PlayareaTableContainer({ children, ...restProps }) {
  return (
    <TableContainer {...restProps}>
      {children}
    </TableContainer>
  )
}

Playarea.Table = function PlayareaTable({ children, ...restProps }) {
  // TODO the table height needs to be calculated from a helper function based on the height of the tableWrapper
  const wrapperRef = useRef()

  let tableHeight
  if(wrapperRef && wrapperRef.current) {
    const wrapperHeight = wrapperRef.current.offsetHeight
    console.log(wrapperHeight)
    tableHeight = 0.75 * wrapperHeight // TODO this is not such a simple calculation, add a helper
  }

  return (
    <TableWrapper ref={wrapperRef}>
      <Table height={tableHeight} {...restProps}>
        {children}
      </Table>
    </TableWrapper>
  )
}

Playarea.PlayersContainer = function PlayareaPlayersContainer({ children, gap = 0, ...restProps }) {
  // TODO make gap a function of containers position vertically
  
  return (
    <PlayersContainer gap={gap} {...restProps}>
      {children}
    </PlayersContainer>
  )
}

Playarea.PlayerWrapper = function PlayareaPlayerWrapper({ children, ...restProps }) {
  return (
    <PlayerWrapper {...restProps}>
      {children}
    </PlayerWrapper>
  )
}

Playarea.Player = function PlayareaPlayer({ children, ...restProps }) {
  return (
    <Player {...restProps}>
      {children}
    </Player>
  )
}