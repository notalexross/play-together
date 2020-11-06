import React, { useState, useContext, useRef, useEffect } from "react"
import { userContext } from "../context/userContext.js"
import Modal from "./Modal.js"

export default function({ onComplete = () => {} }) {
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
    inputRef.current.focus()
  }, [])

  return (
    <Modal>
      <p>Enter your nickname below</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userInput} ref={inputRef} placeholder="enter your nickname" onChange={event => setUserInput(event.target.value)}></input>
        <button>Submit</button>
      </form>
    </Modal>
  )
}