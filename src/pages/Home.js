import React, { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { userContext } from '../context/user'
import NicknameModal from '../containers/nickname-modal'
import { Feature } from '../components'

export default function Home() {
  const history = useHistory()
  const { nickname } = useContext(userContext)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const buttonRef = useRef()

  const handleClick = event => {
    event.preventDefault()
    nickname ? enterGameRoom() : setIsModalOpen(true)
  }

  const enterGameRoom = () => {
    // TODO
    // disable button until response from server is received (after redirect to room)
    buttonRef.current.disabled = true;
    // make room on server, then push client to room
    console.log('creating game room')
    setTimeout(() => {
      console.log('moving to game room')
      const roomId = Math.random().toString(16).split('.').slice(1,9)
      history.push(`${ROUTES.GAMES}/${roomId}`)
      // undisable button if room was not created and therefore not pushed to room
    },1000)
  }

  return (
    <>
      <Feature>
        <Feature.Title>Play Together</Feature.Title>
        <Feature.Text>No download, no registration, and 100% free!</Feature.Text>
        <Feature.Text>Just give your friends the link and play</Feature.Text>
        <Feature.Button onClick={handleClick} ref={buttonRef}>create game room</Feature.Button>
      </Feature>
      <NicknameModal onComplete={enterGameRoom} isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
    </>
  )
}
