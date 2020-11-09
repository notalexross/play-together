import React, { useState, useContext, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { userContext } from '../context/user'
import { Modal } from '../components'

export default function NicknameModal({ onComplete = () => {} }) {
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
    <Modal>
      <Modal.Close/>
      <Modal.Text>Enter your nickname below</Modal.Text>
      <Modal.Form onSubmit={handleSubmit}>
        <Modal.InputText
          ref={inputRef}
          placeholder='enter your nickname'
          value={userInput}
          onChange={event => setUserInput(event.target.value)}
        />
        <Modal.Submit>Submit</Modal.Submit>
      </Modal.Form>
    </Modal>
  )
}

NicknameModal.propTypes ={
  onComplete: PropTypes.func
}