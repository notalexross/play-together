import React, { useContext, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Room, Panel, Table, Player, EmptySeat, Action, GameSelect, Chat, Accordion, Playarea } from '../components'
import { gameContext } from '../context/game'
import useWindowSize from '../hooks/useWindowSize.js'

export default function RoomContainer({ pageHeaderRef }) {
  const [ chatIsExpanded, setChatIsExpanded ] = useState(false)
  const [ settingsIsExpanded, setSettingsIsExpanded ] = useState(false)
  const { sitDown } = useContext(gameContext)
  const { windowWidth } = useWindowSize()
  const settingsHeaderContainerRef = useRef()
  const chatContainerRef = useRef()

  const isLarger = windowWidth > 1200
  const isLarge = windowWidth > 1000
  const isSmall = windowWidth <= 800
  // console.log(windowWidth)

  // TODO
  const players = [{id: 1111, name: 'barry', hand: [1,2], stats: {played: 5, wins: 2}}, {id: 2222, name: 'larry', hand: [3,4], stats: {played: 5, wins: 3}}]
  const messages = [
    {id: 1, user: 'bob', color: '#d46d00', timestamp: '5:03', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ullamcorper lacus, id congue tellus.'},
    {id: 2, user: 'billy', color: '#1e90ff', timestamp: '5:05', message: 'Nam et finibus odio. Vivamus ac elit ac nisi eleifend efficitur et a neque.'},
    {id: 3, user: 'bob', color: '#d46d00', timestamp: '5:08', message: 'Nullam venenatis turpis ut enim tincidunt pharetra. Vestibulum at sem commodo nisi luctus eleifend.'},
    {id: 4, user: 'bob', color: '#d46d00', timestamp: '5:10', message: 'Integer tincidunt justo eros, ut luctus est venenatis vel.'},
    {id: 5, user: 'billy', color: '#1e90ff', timestamp: '5:15', message: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'},
  ]

  const appAbsBottom = document.body.getBoundingClientRect().bottom
  let settingsStyle, settingsExpandHeight, settingsHeaderBottom, settingsBodyStyle, chatExpandedStyle, chatExpandHeight

  if (!isSmall && !isLarger) {
    settingsStyle = {
      height: 'min-content',
      position: 'absolute',
    }
  }

  if (settingsHeaderContainerRef && settingsHeaderContainerRef.current) {
    const settingsHeaderAbsBottom = settingsHeaderContainerRef.current.getBoundingClientRect().bottom
    settingsHeaderBottom = parseInt(window.getComputedStyle(settingsHeaderContainerRef.current).height)
    settingsExpandHeight = appAbsBottom - settingsHeaderAbsBottom - 110 // minus chat height, set based on input plus chat header manually...
  }

  if (pageHeaderRef && pageHeaderRef.current) {
    const pageHeaderAbsBottom = pageHeaderRef.current.getBoundingClientRect().bottom
    chatExpandHeight = appAbsBottom - pageHeaderAbsBottom
  }

  if (isSmall) {
    settingsBodyStyle = {
      position: 'absolute',
      width: '100%',
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
    console.log('set')
  }

  return (
    <Room style={{flexDirection: isSmall ? 'column' : 'row'}}>
      <Panel style={{ zIndex: 10, boxShadow: '0 0 10px #000', ...settingsStyle }} watchProp={isSmall} shouldTransition={!isSmall} width={isSmall ? `${windowWidth}px` : '350px'}>
        <div ref={settingsHeaderContainerRef}>
          <Panel.Header onClick={handleSettingsHeaderClick}>
            {!isSmall && <Panel.Collapse direction={'left'} />}
            <Panel.Title>Settings</Panel.Title>
          </Panel.Header>
        </div>
        {(!isSmall || settingsIsExpanded) &&
          <Panel.Body style={settingsBodyStyle}>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>Game</Accordion.Header>
                <Accordion.Body>
                  <GameSelect>
                    <GameSelect.Game>Uno</GameSelect.Game>
                    <GameSelect.Game>Chess</GameSelect.Game>
                  </GameSelect>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Game Options</Accordion.Header>
                <Accordion.Body>game options</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Room Options</Accordion.Header>
                <Accordion.Body>room options</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Settings</Accordion.Header>
                <Accordion.Body>settings</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Panel.Body>
        }
      </Panel>
      <Panel>
        <Panel.Body>
          <Playarea>
            <Playarea.Area>
              <Playarea.PlayersContainer gap='2%'>
                <Playarea.PlayerWrapper>
                  <Playarea.Player></Playarea.Player>
                </Playarea.PlayerWrapper>
                <Playarea.PlayerWrapper>
                  <Playarea.Player></Playarea.Player>
                </Playarea.PlayerWrapper>
              </Playarea.PlayersContainer>
              <Playarea.TableContainer>
                <Playarea.Table>
                  <div style={{width: '150px', height: '50px', background: 'black', textAlign: 'center'}}></div>
                </Playarea.Table>
                <Playarea.PlayersContainer gap='35%'>
                  <Playarea.PlayerWrapper>
                    <Playarea.Player></Playarea.Player>
                  </Playarea.PlayerWrapper>
                  <Playarea.PlayerWrapper>
                    <Playarea.Player></Playarea.Player>
                  </Playarea.PlayerWrapper>
                </Playarea.PlayersContainer>
                <Playarea.PlayersContainer gap='40%'>
                  <Playarea.PlayerWrapper>
                    <Playarea.Player></Playarea.Player>
                  </Playarea.PlayerWrapper>
                  <Playarea.PlayerWrapper>
                    <Playarea.Player></Playarea.Player>
                  </Playarea.PlayerWrapper>
                </Playarea.PlayersContainer>
                <Playarea.PlayersContainer gap='45%'>
                  <Playarea.PlayerWrapper>
                    <Playarea.Player></Playarea.Player>
                  </Playarea.PlayerWrapper>
                  <Playarea.PlayerWrapper>
                    <Playarea.Player></Playarea.Player>
                  </Playarea.PlayerWrapper>
                </Playarea.PlayersContainer>
              </Playarea.TableContainer>
            </Playarea.Area>
            <Playarea.Main></Playarea.Main>
          </Playarea>
          {/* <Table>
            <Table.Board></Table.Board>
            <Table.Seats>
              {players.map(player => (
                  <Player key={player.id}>
                    <Player.ProfilePicture/>
                    <Player.Stats>
                      <Player.Wins>{player.stats.wins}</Player.Wins>
                      <Player.Played>{player.stats.played}</Player.Played>
                    </Player.Stats>
                    <Player.Nickname>{player.name}</Player.Nickname>
                    <Player.Hand>
                      {player.hand.map(card => {
                        <Player.Card>{card}</Player.Card>
                      })}
                    </Player.Hand>
                    <Player.Playarea></Player.Playarea>
                  </Player>
              ))}
              <EmptySeat onClick={() => sitDown(1234,0)}/>
            </Table.Seats>
            <Table.Actions>
              <Action>Draw</Action>
            </Table.Actions>
          </Table> */}
        </Panel.Body>
      </Panel>
      <Panel innerRef={chatContainerRef} style={{ ...chatExpandedStyle, zIndex: 11, boxShadow: '0 0 10px #000'}} watchProp={isSmall} shouldTransition={!isSmall} width={isSmall ? `${windowWidth}px` : '350px'}>
        <Panel.Header onClick={() => handleChatExpand()}>
          {!isSmall && <Panel.Collapse direction={'right'} />}
          <Panel.Title>Chat</Panel.Title>
        </Panel.Header>
        <Panel.Body>
          <Chat>
            <Chat.Form style={isSmall ? {flexDirection: 'row'} : null}>
              <Chat.TextInput style={isSmall ? {padding: '0.6rem 1rem'} : null} onFocus={() => handleChatExpand(false)} />
              <Chat.Send style={isSmall ? {margin: '0 0 0 0.5em' } : null}>Send</Chat.Send>
            </Chat.Form>
            {(!isSmall || chatIsExpanded) && 
              <Chat.Log style={isSmall ? {fontSize: '20px'} : null}>
                {messages.map(message => (
                  <Chat.Message key={message.id}>
                    <Chat.Timestamp>{message.timestamp}</Chat.Timestamp>
                    <Chat.Sender color={message.color}>{message.user}</Chat.Sender>
                    <Chat.Text>{message.message}</Chat.Text>
                  </Chat.Message>
                ))}
              </Chat.Log>
            }
          </Chat>
        </Panel.Body>
      </Panel>
    </Room>
  )
}