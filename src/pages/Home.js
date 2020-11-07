import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { userContext } from '../context/userContext'
import useModal from '../hooks/useModal'
import { Feature } from '../components'

export default function() {
  const history = useHistory()
  const { nickname } = useContext(userContext)
  const { displayNicknameModal } = useModal()

  const handleClick = event => {
    event.preventDefault()
    // disable button until response from server is received (after redirect to room)
    event.target.disabled = true
    nickname ? enterGameRoom() : displayNicknameModal(enterGameRoom)
  }

  const enterGameRoom = () => {
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
    <Feature>
      <Feature.Title>Play Together</Feature.Title>
      <Feature.Text>No download, no registration, and 100% free!</Feature.Text>
      <Feature.Text>Just give your friends the link and play</Feature.Text>
      <Feature.Button onClick={handleClick}>create game room</Feature.Button>
    </Feature>
  )
}
