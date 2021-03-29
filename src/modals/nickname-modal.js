import React, { useState, useContext, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { firebaseContext } from '../context/firebase'
import { Modal } from '../components'

export default function NicknameModal({
  isOpen = false,
  setIsOpen = () => {},
  onComplete = () => {}
}) {
  const { setNickname } = useContext(firebaseContext)
  const [userInput, setUserInput] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = event => {
    event.preventDefault()
    if (userInput.length > 0) {
      setNickname(userInput)
      setUserInput('')
      onComplete()
      setIsOpen(false)
    }
  }

  useEffect(() => {
    isOpen && inputRef.current.focus()
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Close />
      <Modal.Text>Enter your nickname below</Modal.Text>
      <Modal.Subtext>You can change this at any time</Modal.Subtext>
      <Modal.Form onSubmit={handleSubmit}>
        <Modal.InputText
          ref={inputRef}
          placeholder="enter your nickname"
          value={userInput}
          onChange={event => setUserInput(event.target.value)}
        />
        <Modal.Submit>Submit</Modal.Submit>
      </Modal.Form>
    </Modal>
  )
}

NicknameModal.propTypes = {
  onComplete: PropTypes.func
}
