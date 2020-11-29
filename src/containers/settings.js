import React, { useState, useContext } from 'react'
import { Accordion } from '../components'
import { settingsContext } from '../context/settings'
import { localSettingsContext } from '../context/local-settings'

export default function SettingsContainer() {
  const { changeGlobalSetting } = useContext(settingsContext)
  const { changeLocalSetting } = useContext(localSettingsContext)

  // TODO board and pieces etc. need to be set in database and updated in game.js in response to a change in the database
  const selectBoard = event => {
    changeGlobalSetting('game', event.target.dataset.value)
  }

  const selectPieces = event => {
    changeLocalSetting('piecesGroup', event.target.dataset.value)
  }

  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Game Board</Accordion.Header>
        <Accordion.Body onClick={selectBoard} data-value="checkers">Checkers</Accordion.Body>
        <Accordion.Body onClick={selectBoard} data-value="chess">Chess</Accordion.Body>
        <Accordion.Body onClick={selectBoard} data-value="tic-tac-toe">Tic Tac Toe</Accordion.Body>
        <Accordion.Body onClick={selectBoard} data-value="ludo">Ludo</Accordion.Body>
        <Accordion.Body onClick={selectBoard} data-value="connect-four">Connect Four</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Game Pieces</Accordion.Header>
        <Accordion.Body onClick={selectPieces} data-value="checkers">Checkers</Accordion.Body>
        <Accordion.Body onClick={selectPieces} data-value="chess">Chess</Accordion.Body>
        <Accordion.Body onClick={selectPieces} data-value="tic-tac-toe">Tic Tac Toe</Accordion.Body>
        <Accordion.Body onClick={selectPieces} data-value="ludo">Ludo</Accordion.Body>
        <Accordion.Body onClick={selectPieces} data-value="connect-four">Connect Four</Accordion.Body>
        <Accordion.Body onClick={selectPieces} data-value="favourites">Favourites</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Room Options</Accordion.Header>
        <Accordion.Body>Board Colour</Accordion.Body>
        <Accordion.Body>Auto Populate Board</Accordion.Body>
        <Accordion.Body>Clear Board</Accordion.Body>
        <Accordion.Body>Scale Pieces</Accordion.Body>
        <Accordion.Body>Reset Sizes</Accordion.Body>
        <Accordion.Body>Reset Colours</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>User Options</Accordion.Header>
        <Accordion.Body>Nickname</Accordion.Body>
        <Accordion.Body>Colour</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}