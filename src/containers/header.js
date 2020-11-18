import React, { useContext, useState, useEffect } from 'react'
import { Copy as CopyEmpty } from '@styled-icons/boxicons-regular/Copy'
import { Copy as CopyFilled} from '@styled-icons/boxicons-solid/Copy'
import { userContext } from '../context/user'
import * as ROUTES from '../constants/routes'
import ChangeNicknameButton from './change-nickname-button'
import { Header, Tooltip } from '../components'
import useHover from '../hooks/useHover.js'
import useWindowSize from '../hooks/useWindowSize.js'

export default function HeaderContainer({ innerRef }) {
  const { nickname } = useContext(userContext)
  const [ tooltip, setTooltip ] = useState()
  const [ isHovered, hoverRef ] = useHover()

  const { windowWidth } = useWindowSize()

  const isLarge = windowWidth > 1000
  const isSmall = windowWidth <= 800

  useEffect(() => {
      if (isHovered) {
        setTooltip('click to copy')
      }
  }, [isHovered])

  const handleClick = () => {
    console.log('copying')
    const copyField = document.createElement('input')
    copyField.style = 'position: absolute; left: -1000px; top: -1000px'
    copyField.value = window.location.href
    document.body.appendChild(copyField)
    copyField.select()
    document.execCommand('copy')
    document.body.removeChild(copyField)
    setTooltip('copied')
  }

  return (
    // <Header style={{flexDirection: isSmall ? 'column' : 'row'}}>
    <Header innerRef={innerRef}>
      <Header.HomeLink to={ROUTES.HOME}>
        Home
      </Header.HomeLink>
      <Header.Text style={{order: isSmall ? '1' : '0'}}>
        {isSmall ? null : 'Shareable Link:'}
        <Tooltip tooltip={tooltip} side={isLarge ? 'right' : isSmall ? 'left' : 'bottom'}>
          <div ref={hoverRef} onClick={handleClick}>
            {
              isLarge ? 
                <Header.TextCopy>{window.location.href}</Header.TextCopy> :
                isHovered ? <CopyFilled style={{height: '20px', width: '20px'}}/> : <CopyEmpty style={{height: '20px', width: '20px'}}/> 
            }
          </div>
        </Tooltip>
      </Header.Text>
      <Header.Text>
        {isSmall ? null : 'Nickname:'} {nickname}
        <ChangeNicknameButton/>
      </Header.Text>
    </Header>
  )
}

