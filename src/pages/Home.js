import React, { useContext, useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { firebaseContext } from '../context/firebase'
import NicknameModal from '../modals/nickname-modal'
import { Feature } from '../components'

export default function Home() {
  const history = useHistory()
  const { user, createRoom } = useContext(firebaseContext)
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false)
  const buttonRef = useRef()

  const handleClick = event => {
    event && event.preventDefault()
    user.displayName ? enterGameRoom() : setIsNicknameModalOpen(true)
  }

  const handleCompleted = () => {
    buttonRef.current.disabled = true
  }

  const enterGameRoom = () => {
    createRoom().then(roomId => {
      console.log('moving to game room')
      history.push(`${ROUTES.GAMES}/${roomId}`)
    })
  }

  useEffect(() => {
    if (user && user.displayName && buttonRef.current.disabled) {
      enterGameRoom()
    }
  }, [user && user.displayName])

  return (
    <>
      <Feature>
        <Feature.Title>Play Together</Feature.Title>
        <Feature.Text>No download, no registration, and 100% free!</Feature.Text>
        <Feature.Text>Just give your friends the link and play</Feature.Text>
        <Feature.Button onClick={handleClick} ref={buttonRef}>
          create game room
        </Feature.Button>
      </Feature>
      <NicknameModal
        onComplete={handleCompleted}
        isOpen={isNicknameModalOpen}
        setIsOpen={setIsNicknameModalOpen}
      />
    </>
  )
}
