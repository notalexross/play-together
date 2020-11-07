import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { ModalContext } from '../context/modal'

export default function useModal(Modal) {
  const [ isShown, setIsShown ] = useState(false)

  const openModal = () => setIsShown(true)
  const closeModal = () => setIsShown(false)

  const Component = ({ onComplete = () => {} }) => {
    return isShown ?
      ReactDOM.createPortal(
        <ModalContext.Provider value={{ closeModal }}>
          <Modal
            onComplete={() => {
              closeModal()
              onComplete()
            }}
          />
        </ModalContext.Provider>, document.getElementById('root')
      )
    : null
  }

  return [ Component, openModal ]
}