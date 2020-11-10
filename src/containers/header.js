import React, { useContext } from 'react'
import { userContext } from '../context/user'
import * as ROUTES from '../constants/routes'
import ChangeNicknameButton from './change-nickname-button'
import { Header } from '../components'

export default function HeaderContainer() {
  const { nickname } = useContext(userContext)

  return (
    <Header>
      <Header.HomeLink to={ROUTES.HOME}>Home</Header.HomeLink>
      <Header.Wrapper>
        <Header.Text>Shareable Link: </Header.Text>
        <Header.TextCopy>{window.location.href}</Header.TextCopy>
      </Header.Wrapper>
      <Header.Wrapper>
        <Header.Text>Nickname: {nickname}</Header.Text>
        <ChangeNicknameButton/>
      </Header.Wrapper>
    </Header>
  )
}

