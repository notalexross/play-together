// TODO some of this can possibly be rewritten to use useEffect
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Panel } from '../components'
import SettingsContainer from './settings'
import GameContainer from './game'
import ChatContainer from './chat'
import useWindowSize from '../hooks/useWindowSize.js'
import useForceRender from '../hooks/useForceRender.js'

export default function RoomContainer() {
  const [ chatIsExpanded, setChatIsExpanded ] = useState(false)
  const [ settingsIsExpanded, setSettingsIsExpanded ] = useState(false)
  const { windowWidth } = useWindowSize()
  const settingsHeaderContainerRef = useRef()
  const chatContainerRef = useRef()
  const mainPanelRef = useRef()
  const panelContainerRef = useRef()
  const forceRender = useForceRender() // added to onTransitionEnd event of collapse button, so playarea panel gets updated parent width

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

  if (panelContainerRef && panelContainerRef.current) {
    chatExpandHeight = panelContainerRef.current.clientHeight
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
    <Panel.Container ref={panelContainerRef}>
      <Panel style={!isSmall && !isLargest ? { position: 'absolute' } : null} width={isSmall ? `100%` : '350px'} startCollapsed>
        <Panel.Header innerRef={settingsHeaderContainerRef} onClick={handleSettingsHeaderClick}>
          <Panel.Collapse direction={'left'} onTransitionEnd={forceRender}/>
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
          <Panel.Collapse direction={'right'} onTransitionEnd={forceRender}/>
          <Panel.Title>Chat</Panel.Title>
        </Panel.Header>
        <Panel.Body>
          <ChatContainer onFocus={() => handleChatExpand(false)} isExpanded={chatIsExpanded}/>
        </Panel.Body>
      </Panel>
    </Panel.Container>
  )
}