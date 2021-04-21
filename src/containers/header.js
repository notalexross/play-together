import React, { useContext, useState, useEffect } from 'react'
/* eslint-disable import/no-extraneous-dependencies */
import { Copy as CopyEmpty } from '@styled-icons/boxicons-regular/Copy'
import { Copy as CopyFilled } from '@styled-icons/boxicons-solid/Copy'
import { EditBox as EditBoxEmpty } from '@styled-icons/remix-line'
import { EditBox as EditBoxFilled } from '@styled-icons/remix-fill'
/* eslint-enable import/no-extraneous-dependencies */
import * as ROUTES from '../constants/routes'
import { Hover, Header, Tooltip, ColorPicker } from '../components'
import NicknameModal from '../modals/nickname-modal'
import useHover from '../hooks/useHover'
import { windowContext } from '../context/window'
import { firebaseContext } from '../context/firebase'

export default function HeaderContainer() {
  const { windowWidth } = useContext(windowContext)
  const { user, userColor, setColor } = useContext(firebaseContext)
  const [currentColor, setCurrentColor] = useState(userColor)
  const [tooltip, setTooltip] = useState()
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false)
  const [isHovered, hoverRef] = useHover()

  const isLarge = windowWidth > 1000
  const isSmall = windowWidth <= 800

  let renderUrlCopyField
  if (isLarge) {
    renderUrlCopyField = <Header.TextCopy>{window.location.href}</Header.TextCopy>
  } else if (isHovered) {
    renderUrlCopyField = <CopyFilled style={{ height: '20px', width: '20px' }} />
  } else {
    renderUrlCopyField = <CopyEmpty style={{ height: '20px', width: '20px' }} />
  }

  const handleClick = () => {
    const copyField = document.createElement('input')
    copyField.style = 'position: absolute; left: -1000px; top: -1000px'
    copyField.value = window.location.href
    document.body.appendChild(copyField)
    copyField.select()
    document.execCommand('copy')
    document.body.removeChild(copyField)
    setTooltip('copied')
  }

  const handleKeyUp = event => {
    event.key === 'Enter' && handleClick()
  }

  const handleCloseColorPicker = () => {
    if (currentColor === userColor) return
    setColor(currentColor)
  }

  useEffect(() => {
    if (isHovered) {
      setTooltip('click to copy')
    }
  }, [isHovered])

  useEffect(() => {
    setCurrentColor(userColor)
  }, [userColor])

  return (
    <Header>
      <Header.Wrapper>
        <Header.HomeLink to={ROUTES.HOME}>Home</Header.HomeLink>
      </Header.Wrapper>
      <Header.Wrapper style={{ flex: 2 }}>
        <Header.Text style={{ order: isSmall ? '1' : '0' }}>
          {!isSmall && 'Shareable Link:'}
          <Tooltip tooltip={tooltip} side={(isLarge && 'right') || (isSmall && 'left') || 'bottom'}>
            <div
              ref={hoverRef}
              role="button"
              tabIndex={0}
              onClick={handleClick}
              onKeyUp={handleKeyUp}
            >
              {renderUrlCopyField}
            </div>
          </Tooltip>
        </Header.Text>
      </Header.Wrapper>
      <Header.Wrapper>
        <Header.Text>
          {!isSmall && 'Nickname: '}
          <span style={{ color: currentColor }}>{user.displayName}</span>
          <Hover
            DefaultComponent={EditBoxEmpty}
            HoverComponent={EditBoxFilled}
            onClick={() => setIsNicknameModalOpen(true)}
          />
          <ColorPicker
            value={currentColor}
            onChange={event => setCurrentColor(event.target.value)}
            onBlur={handleCloseColorPicker}
          />
        </Header.Text>
      </Header.Wrapper>
      <NicknameModal isOpen={isNicknameModalOpen} setIsOpen={setIsNicknameModalOpen} />
    </Header>
  )
}
