// TODO
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Container, HomeLink, Wrapper, Text, TextCopy } from './styles'

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
  // TODO add tooltip when clicked to indicate copied (and when hovered over?)
  const handleClick = event => {
    const copyField = document.createElement("input");
    copyField.style = "position: absolute; left: -1000px; top: -1000px";
    copyField.value = event.target.textContent;
    document.body.appendChild(copyField);
    copyField.select();
    document.execCommand("copy");
    document.body.removeChild(copyField);
  }

  return (
    <TextCopy onClick={handleClick} {...restProps}>
      {children}
    </TextCopy>
  )

}

Header.Wrapper = function HeaderWrapper({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>
}