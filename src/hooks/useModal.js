import React, { useState } from 'react'
import ReactDOM from 'react-dom'

export default function(Modal) {
  const [ isShown, setIsShown ] = useState(false)

  const openModal = () => setIsShown(true)

  const Component = ({ onComplete = () => {} }) => {
    return isShown ?
      ReactDOM.createPortal(
        <Modal
          close={() => setIsShown(false)}
          onComplete={() => {
            setIsShown(false)
            onComplete()
          }}
        />, document.getElementById('root')
      )
    : null
  }

  return [ Component, openModal ]
}