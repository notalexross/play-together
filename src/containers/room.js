import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Panel } from '../components'
import SettingsContainer from './settings'
import GameContainer from './game'
import ChatContainer from './chat'
import useWindowSize from '../hooks/useWindowSize.js'

export default function RoomContainer({ pageHeaderRef }) {
  const [ chatIsExpanded, setChatIsExpanded ] = useState(false)
  const [ settingsIsExpanded, setSettingsIsExpanded ] = useState(false)
  const { windowWidth } = useWindowSize()
  const settingsHeaderContainerRef = useRef()
  const chatContainerRef = useRef()
  const mainPanelRef = useRef()

  const isLargest = windowWidth > 1200
  // const isLarge = windowWidth > 1000
  const isSmall = windowWidth <= 800

  const appHeight = document.body.scrollHeight
  let settingsExpandHeight, settingsHeaderBottom, settingsBodyStyle, chatExpandedStyle, chatExpandHeight, settingsHeaderAbsBottom

  if (settingsHeaderContainerRef && settingsHeaderContainerRef.current) {
    settingsHeaderAbsBottom = settingsHeaderContainerRef.current.getBoundingClientRect().bottom
    settingsHeaderBottom = parseInt(window.getComputedStyle(settingsHeaderContainerRef.current).height)
    settingsExpandHeight = appHeight - settingsHeaderAbsBottom - 112 // number from trial and error.. can't use main panel bottom, as changes when chat opens (whilst settings open)
  }

  if (pageHeaderRef && pageHeaderRef.current) {
    const pageHeaderAbsBottom = pageHeaderRef.current.getBoundingClientRect().bottom
    chatExpandHeight = appHeight - pageHeaderAbsBottom
  }

  if (isSmall) {
    settingsBodyStyle = {
      position: 'absolute',
      width: '100%',
      left: 0,
      height: settingsExpandHeight,
      top: settingsHeaderBottom
    }
  }

  if (!isSmall && !isLargest) {
    settingsBodyStyle = {
      maxHeight: appHeight - settingsHeaderAbsBottom || 0
    }
  }

  if (isSmall && chatIsExpanded) {
    chatExpandedStyle = {
      position: 'absolute',
      height: chatExpandHeight,
      width: '100%'
    }
  }

  const handleSettingsHeaderClick = () => {
    isSmall && setSettingsIsExpanded(prev => !prev)
  }

  const handleChatExpand = (toggle = true) => {
    if (!isSmall) return
    toggle ? setChatIsExpanded(prev => !prev) : setChatIsExpanded(true)
  }

  return (
    <Panel.Container>
      <Panel style={!isSmall && !isLargest ? { position: 'absolute' } : null} width={isSmall ? `100%` : '350px'}>
        <Panel.Header innerRef={settingsHeaderContainerRef} onClick={handleSettingsHeaderClick}>
          <Panel.Collapse direction={'left'} />
          <Panel.Title>Settings</Panel.Title>
        </Panel.Header>
        {(!isSmall || settingsIsExpanded) &&
          <Panel.Body style={settingsBodyStyle}>
            <SettingsContainer />
          </Panel.Body>
        }
      </Panel>
      <Panel innerRef={mainPanelRef} style={{ zIndex: 0, overflow: 'hidden' }}>
        <Panel.Body>
          <GameContainer />
        </Panel.Body>
      </Panel>
      <Panel innerRef={chatContainerRef} style={chatExpandedStyle} width={isSmall ? `100%` : '350px'}>
        <Panel.Header onClick={() => handleChatExpand()}>
          <Panel.Collapse direction={'right'} />
          <Panel.Title>Chat</Panel.Title>
        </Panel.Header>
        <Panel.Body>
          <ChatContainer onFocus={() => handleChatExpand(false)} isExpanded={chatIsExpanded}/>
        </Panel.Body>
      </Panel>
    </Panel.Container>
  )
}