import React, { useContext, useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { firebaseContext } from '../context/firebase'
import NicknameModal from '../containers/nickname-modal'
import { Feature } from '../components'

export default function Home() {
  const history = useHistory()
  const { user, createRoom } = useContext(firebaseContext)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const buttonRef = useRef()

  const handleClick = event => {
    event && event.preventDefault()
    user.displayName ? enterGameRoom() : setIsModalOpen(true)
  }

  const enterGameRoom = () => {
    // TODO
    // disable button until response from server is received (after redirect to room)
    buttonRef.current.disabled = true;

    createRoom().then(roomId => {
      console.log('moving to game room')
      history.push(`${ROUTES.GAMES}/${roomId}`)
    })
  }

  return (
    <>
      <Feature>
        <Feature.Title>Play Together</Feature.Title>
        <Feature.Text>No download, no registration, and 100% free!</Feature.Text>
        <Feature.Text>Just give your friends the link and play</Feature.Text>
        <Feature.Button onClick={handleClick} ref={buttonRef}>create game room</Feature.Button>
      </Feature>
      <NicknameModal onComplete={handleClick} isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
    </>
  )
}
