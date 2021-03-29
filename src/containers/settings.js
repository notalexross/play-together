import React, { useContext } from 'react'
import { Accordion } from '../components'
import { gameContext } from '../context/game'
import { settingsContext } from '../context/settings'
import { localSettingsContext } from '../context/local-settings'
import piecesConfig from '../constants/pieces-config'
import layoutsConfig from '../constants/layouts-config'

export default function SettingsContainer() {
  const { addMultiplePieces, clearPieces } = useContext(gameContext)
  const { globalSettings, changeGlobalSetting } = useContext(settingsContext)
  const { changeLocalSetting, rotatePlayarea } = useContext(localSettingsContext)

  const selectBoard = event => {
    if (globalSettings.game === event.target.dataset.value) return

    changeGlobalSetting('game', event.target.dataset.value)
    rotatePlayarea(0)
  }

  const selectPieces = event => {
    changeLocalSetting('piecesGroup', event.target.dataset.value)
  }

  const handleAutoPopulate = () => {
    const layout = layoutsConfig[globalSettings.game]

    if (layout) {
      const pieces = layout.map(([id, _]) => piecesConfig[id])
      const positions = layout.map(([_, position]) => position)
      addMultiplePieces(pieces, positions)
    }
  }

  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Game Board</Accordion.Header>
        <Accordion.Body onClick={selectBoard} data-value="backgammon">
          Backgammon
        </Accordion.Body>
        <Accordion.Body onClick={selectBoard} data-value="checkers">
          Checkers
        </Accordion.Body>
        <Accordion.Body onClick={selectBoard} data-value="chess">
          Chess
        </Accordion.Body>
        <Accordion.Body onClick={selectBoard} data-value="chess3p">
          Chess (3 players)
        </Accordion.Body>
        <Accordion.Body onClick={selectBoard} data-value="connectfour">
          Connect Four
        </Accordion.Body>
        <Accordion.Body onClick={selectBoard} data-value="ludo">
          Ludo
        </Accordion.Body>
        <Accordion.Body onClick={selectBoard} data-value="snakes">
          Snakes & Ladders
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Game Pieces</Accordion.Header>
        <Accordion.Body onClick={selectPieces} data-value="backgammon">
          Backgammon
        </Accordion.Body>
        <Accordion.Body onClick={selectPieces} data-value="checkers">
          Checkers
        </Accordion.Body>
        <Accordion.Body onClick={selectPieces} data-value="chess">
          Chess
        </Accordion.Body>
        <Accordion.Body onClick={selectPieces} data-value="chess3p">
          Chess (3 players)
        </Accordion.Body>
        <Accordion.Body onClick={selectPieces} data-value="connectfour">
          Connect Four
        </Accordion.Body>
        <Accordion.Body onClick={selectPieces} data-value="ludo">
          Ludo
        </Accordion.Body>
        <Accordion.Body onClick={selectPieces} data-value="snakes">
          Snakes & Ladders
        </Accordion.Body>
        <Accordion.Body onClick={selectPieces} data-value="dice">
          Dice
        </Accordion.Body>
        <Accordion.Body onClick={selectPieces} data-value="favorites">
          Favourites
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Game Options</Accordion.Header>
        <Accordion.Body onClick={handleAutoPopulate}>Auto Populate Board</Accordion.Body>
        <Accordion.Body onClick={clearPieces}>Clear Board</Accordion.Body>
        {/* <Accordion.Body>Board Colour</Accordion.Body>
        <Accordion.Body>Scale Pieces</Accordion.Body> */}
        {/* <Accordion.Body>Reset Sizes</Accordion.Body>
        <Accordion.Body>Reset Colours</Accordion.Body> */}
      </Accordion.Item>
      {/* <Accordion.Item>
        <Accordion.Header>Custom Layouts</Accordion.Header>
        <Accordion.Body>Save Current Layout</Accordion.Body>
        <Accordion.Body>Layout 1</Accordion.Body>
      </Accordion.Item> */}
      <Accordion.Item>
        <Accordion.Header>Local Options</Accordion.Header>
        <Accordion.Body onClick={() => rotatePlayarea()}>Rotate Board</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
