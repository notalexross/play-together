import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { userContext } from '../context/user'
import * as ROUTES from '../constants/routes'
import ChangeNicknameButton from './change-nickname-button'
import { Header } from '../components'

export default function HeaderContainer() {
  const { roomId } = useParams()
  const { nickname } = useContext(userContext)
  
  return (
    <Header>
      <Header.HomeLink to={ROUTES.HOME}>Home</Header.HomeLink>
      <Header.Info>{roomId}</Header.Info>
      <Header.User>
        <Header.UserNickname>{nickname}</Header.UserNickname>
        <ChangeNicknameButton/>
      </Header.User>
    </Header>
  )
}

