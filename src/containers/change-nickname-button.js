import React from 'react'
import { EditBox as EditBoxEmpty } from '@styled-icons/remix-line'
import { EditBox as EditBoxFilled } from '@styled-icons/remix-fill'
import { Hover } from '../components'
import NicknameModal from './nickname-modal'
import useModal from '../hooks/useModal'

export default function ChangeNicknameButton() {
  const [ Modal, openModal ] = useModal(NicknameModal)

  return (
    <>
      <Hover
        DefaultComponent={EditBoxEmpty}
        HoverComponent={EditBoxFilled}
        onClick={() => openModal()}
      />
      <Modal/>
    </>
  )
}