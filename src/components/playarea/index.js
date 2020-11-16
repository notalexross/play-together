import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Container, Area, Main, TableContainer, TableWrapper, Table, PlayersContainer, PlayerWrapper, Player } from './styles'
import { getPreRotatedHeight } from '../../utils'
import { Letterboxd } from 'styled-icons/simple-icons'

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
  const wrapperRef = useRef()
  const tableRef = useRef()

  const angle0Height = 1200
  const maxAngle = 45
  const minAngle = 11
  const perspective = 400

  let tableHeight, angle
  if(wrapperRef && wrapperRef.current) {
    const wrapperHeight = wrapperRef.current.offsetHeight

    angle = Math.max(Math.min((angle0Height - wrapperHeight) / angle0Height * maxAngle, maxAngle), minAngle)
    tableHeight = getPreRotatedHeight(wrapperHeight, -angle, perspective)
  }

  return (
    <TableWrapper ref={wrapperRef}>
      <Table ref={tableRef} height={tableHeight} angle={angle} perspective={perspective} {...restProps}>
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