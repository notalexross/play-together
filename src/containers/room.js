import React, { useContext, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Panel, Chat } from '../components'
import SettingsContainer from './settings'
import GameContainer from './game'
import useWindowSize from '../hooks/useWindowSize.js'

export default function RoomContainer({ pageHeaderRef }) {
  const [ chatIsExpanded, setChatIsExpanded ] = useState(false)
  const [ settingsIsExpanded, setSettingsIsExpanded ] = useState(false)
  const { windowWidth } = useWindowSize()
  const settingsHeaderContainerRef = useRef()
  const chatContainerRef = useRef()
  const mainPanelRef = useRef()

  const isLarger = windowWidth > 1200
  const isLarge = windowWidth > 1000
  const isSmall = windowWidth <= 800

  // TODO
  const messages = [
    {id: 1, user: 'bob', color: '#d46d00', timestamp: '5:03', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ullamcorper lacus, id congue tellus.'},
    {id: 2, user: 'billy', color: '#1e90ff', timestamp: '5:05', message: 'Nam et finibus odio. Vivamus ac elit ac nisi eleifend efficitur et a neque.'},
    {id: 3, user: 'bob', color: '#d46d00', timestamp: '5:08', message: 'Nullam venenatis turpis ut enim tincidunt pharetra. Vestibulum at sem commodo nisi luctus eleifend.'},
    {id: 4, user: 'bob', color: '#d46d00', timestamp: '5:10', message: 'Integer tincidunt justo eros, ut luctus est venenatis vel.'},
    {id: 5, user: 'billy', color: '#1e90ff', timestamp: '5:15', message: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'},
  ]

  const appHeight = document.body.scrollHeight
  let settingsStyle, settingsExpandHeight, settingsHeaderBottom, settingsBodyStyle, chatExpandedStyle, chatExpandHeight

  if (!isSmall && !isLarger) {
    settingsStyle = {
      position: 'absolute',
      maxHeight: '100%',
      overflow: 'auto',
    }
  }

  if (settingsHeaderContainerRef && settingsHeaderContainerRef.current) {
    const settingsHeaderAbsBottom = settingsHeaderContainerRef.current.getBoundingClientRect().bottom
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
    <Panel.Container style={{flexDirection: isSmall ? 'column' : 'row'}}>
      <Panel style={{ zIndex: 10, boxShadow: '0 0 10px #000', ...settingsStyle }} watchProp={isSmall} shouldTransition={!isSmall} width={isSmall ? `100%` : '350px'}>
        <Panel.Header innerRef={settingsHeaderContainerRef} onClick={handleSettingsHeaderClick}>
          {!isSmall &&
            <Panel.Collapse direction={'left'} />
          }
          <Panel.Title>
            Settings
          </Panel.Title>
        </Panel.Header>
        {(!isSmall || settingsIsExpanded) &&
          <Panel.Body style={settingsBodyStyle}>
            <SettingsContainer />
          </Panel.Body>
        }
      </Panel>
      <Panel innerRef={mainPanelRef}>
        <Panel.Body>
          <GameContainer />
        </Panel.Body>
      </Panel>
      <Panel innerRef={chatContainerRef} style={{ ...chatExpandedStyle, zIndex: 11, boxShadow: '0 0 10px #000'}} watchProp={isSmall} shouldTransition={!isSmall} width={isSmall ? `100%` : '350px'}>
        <Panel.Header onClick={() => handleChatExpand()}>
          {!isSmall &&
            <Panel.Collapse direction={'right'} />
          }
          <Panel.Title>
            Chat
          </Panel.Title>
        </Panel.Header>
        <Panel.Body>
          <Chat>
            <Chat.Form style={isSmall ? {flexDirection: 'row'} : null}>
              <Chat.TextInput style={isSmall ? {padding: '0.6rem 1rem'} : null} onFocus={() => handleChatExpand(false)} />
              <Chat.Send style={isSmall ? {margin: '0 0 0 0.5em' } : null}>
                Send
              </Chat.Send>
            </Chat.Form>
            {(!isSmall || chatIsExpanded) && 
              <Chat.Log>
                {messages.map(message => (
                  <Chat.Message style={isSmall ? {fontSize: '20px', background: '#111', padding: '1em'} : null} key={message.id}>
                    <Chat.Timestamp>
                      {message.timestamp}
                    </Chat.Timestamp>
                    <Chat.Sender color={message.color}>
                      {message.user}
                    </Chat.Sender>
                    <Chat.Text>
                      {message.message}
                    </Chat.Text>
                  </Chat.Message>
                ))}
              </Chat.Log>
            }
          </Chat>
        </Panel.Body>
      </Panel>
    </Panel.Container>
  )
}