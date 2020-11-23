import React, { useState } from 'react'
import { EditBox as EditBoxEmpty } from '@styled-icons/remix-line'
import { EditBox as EditBoxFilled } from '@styled-icons/remix-fill'
import { Hover } from '../components'
import NicknameModal from './nickname-modal'

export default function ChangeNicknameButton() {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <>
      <Hover
        DefaultComponent={EditBoxEmpty}
        HoverComponent={EditBoxFilled}
        onClick={() => setIsOpen(true)}
      />
      <NicknameModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}