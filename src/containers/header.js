import React, { useContext, useState, useEffect } from 'react'
import { Copy as CopyEmpty } from '@styled-icons/boxicons-regular/Copy'
import { Copy as CopyFilled} from '@styled-icons/boxicons-solid/Copy'
import { EditBox as EditBoxEmpty } from '@styled-icons/remix-line'
import { EditBox as EditBoxFilled } from '@styled-icons/remix-fill'
import * as ROUTES from '../constants/routes'
import { Hover } from '../components'
import NicknameModal from '../modals/nickname-modal'
import { Header, Tooltip, ColorPicker } from '../components'
import useHover from '../hooks/useHover.js'
import { windowContext } from '../context/window'
import { firebaseContext } from '../context/firebase'

export default function HeaderContainer() {
  const { user, userColor, setColor } = useContext(firebaseContext)
  const [ currentColor, setCurrentColor ] = useState(userColor)
  const [ tooltip, setTooltip ] = useState()
  const [ isNicknameModalOpen, setIsNicknameModalOpen ] = useState(false)
  const [ isHovered, hoverRef ] = useHover()

  const { windowWidth } = useContext(windowContext)

  const isLarge = windowWidth > 1000
  const isSmall = windowWidth <= 800

  useEffect(() => {
      if (isHovered) {
        setTooltip('click to copy')
      }
  }, [isHovered])

  useEffect(() => {
    setCurrentColor(userColor)
  }, [userColor])

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

  const handleCloseColorPicker = () => {
    if (currentColor === userColor) return
    setColor(currentColor)
  }

  return (
    // <Header style={{flexDirection: isSmall ? 'column' : 'row'}}>
    <Header>
      <Header.Wrapper>
        <Header.HomeLink to={ROUTES.HOME}>
          Home
        </Header.HomeLink>
      </Header.Wrapper>
      <Header.Wrapper style={{flex: 2}}>
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
      </Header.Wrapper>
      <Header.Wrapper>
        <Header.Text>
          {isSmall ? null : 'Nickname:'} <span style={{color: currentColor}}>{user.displayName}</span>
          <Hover
            DefaultComponent={EditBoxEmpty}
            HoverComponent={EditBoxFilled}
            onClick={() => setIsNicknameModalOpen(true)}
          />
          <ColorPicker value={currentColor} onChange={event => setCurrentColor(event.target.value)} onBlur={handleCloseColorPicker}/>
        </Header.Text>
      </Header.Wrapper>
      <NicknameModal isOpen={isNicknameModalOpen} setIsOpen={setIsNicknameModalOpen} />
    </Header>
  )
}
