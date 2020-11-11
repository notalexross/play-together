// TODO
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Container, HomeLink, Wrapper, Text, TextCopy } from './styles'
import { Tooltip } from '..'
import useHover from '../../hooks/useHover.js'

export default function Header({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}

Header.HomeLink = function HeaderUserHomeLink({ children, ...restProps }) {
  return <HomeLink {...restProps}>{children}</HomeLink>
}

Header.Text = function HeaderText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>
}

Header.TextCopy = function HeaderTextCopy({ children, ...restProps }) {
  const [ tooltip, setTooltip ] = useState('')
  const [ isHovered, hoverRef ] = useHover()

  useEffect(() => {
      isHovered && setTooltip('click to copy')
  }, [isHovered])

  const handleClick = event => {
    const copyField = document.createElement('input');
    copyField.style = 'position: absolute; left: -1000px; top: -1000px';
    copyField.value = event.target.textContent;
    document.body.appendChild(copyField);
    copyField.select();
    document.execCommand('copy');
    document.body.removeChild(copyField);
    setTooltip('copied')
  }

  return (
    <Tooltip tooltip={tooltip} side='right'>
      <TextCopy ref={hoverRef} onClick={handleClick} {...restProps}>
          {children}
      </TextCopy>
    </Tooltip>
  )
}

Header.Wrapper = function HeaderWrapper({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>
}