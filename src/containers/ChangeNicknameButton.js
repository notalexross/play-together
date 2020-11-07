import React from 'react'
import { Hover } from '../components'
import useModal from '../hooks/useModal'
import { EditBox as EditBoxEmpty } from '@styled-icons/remix-line'
import { EditBox as EditBoxFilled } from '@styled-icons/remix-fill'

export default function ChangeNicknameButton() {
  const { displayNicknameModal } = useModal()

  return (
    <Hover
      DefaultComponent={EditBoxEmpty}
      HoverComponent={EditBoxFilled}
      onClick={() => displayNicknameModal()}
    />
  )
}