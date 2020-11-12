import React, { useContext, useState, useEffect } from 'react'
import { Copy as CopyEmpty } from '@styled-icons/boxicons-regular/Copy'
import { Copy as CopyFilled} from '@styled-icons/boxicons-solid/Copy'
import { userContext } from '../context/user'
import * as ROUTES from '../constants/routes'
import ChangeNicknameButton from './change-nickname-button'
import { Header, Tooltip, Hover } from '../components'
import useHover from '../hooks/useHover.js'

export default function HeaderContainer() {
  const { nickname } = useContext(userContext)
  const [ tooltip, setTooltip ] = useState()
  const [ isHovered, hoverRef ] = useHover()

  useEffect(() => {
      isHovered && setTooltip('click to copy')
  }, [isHovered])

  const handleClick = event => {
    console.log('copying')
    const copyField = document.createElement('input')
    copyField.style = 'position: absolute; left: -1000px; top: -1000px'
    copyField.value = event.target.textContent
    document.body.appendChild(copyField)
    copyField.select()
    document.execCommand('copy')
    document.body.removeChild(copyField)
    setTooltip('copied')
  }

  return (
    <Header>
      <Header.HomeLink to={ROUTES.HOME}>Home</Header.HomeLink>
      <Header.Text className='header-copy-link-text'>
        Shareable Link:
        <Tooltip tooltip={tooltip} side='right'>
          <Header.TextCopy innerRef={hoverRef} onClick={handleClick}>
            {window.location.href}
          </Header.TextCopy>
        </Tooltip>
      </Header.Text>
      <Header.Text className='header-copy-link-symbol'>
        Shareable Link:
        <Tooltip tooltip={tooltip} side='bottom' align='flex-end'>
          <div ref={hoverRef} onClick={handleClick}>
            <Hover
              DefaultComponent={CopyEmpty}
              HoverComponent={CopyFilled}
            />
          </div>
        </Tooltip>
      </Header.Text>
      <Header.Text>Nickname: {nickname} <ChangeNicknameButton/></Header.Text>
    </Header>
  )
}

