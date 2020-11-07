import React, { useState, useContext, useRef, useEffect } from 'react'
import { userContext } from '../context/userContext'
import { Modal } from '../components'

export default function NicknameModal({ close = () => {}, onComplete = () => {} }) {
  const { setNickname } = useContext(userContext)
  const [ userInput, setUserInput ] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = event => {
    event.preventDefault()
    if (userInput.length > 0) {
      setNickname(userInput)
      setUserInput('')
      onComplete()
    }
  }

  useEffect(() => {
    inputRef && inputRef.current && inputRef.current.focus()
  }, [inputRef])

  return (
    <Modal close={close}>
      <Modal.Close/>
      <Modal.Text>Enter your nickname below</Modal.Text>
      <Modal.Form onSubmit={handleSubmit}>
        <Modal.InputText
          innerRef={inputRef}
          placeholder='enter your nickname'
          value={userInput}
          onChange={event => setUserInput(event.target.value)}
        />
        <Modal.Submit>Submit</Modal.Submit>
      </Modal.Form>
    </Modal>
  )
}