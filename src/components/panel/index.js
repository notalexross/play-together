// TODO
import React, { useContext, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { CollapseRight } from '@styled-icons/open-iconic/CollapseRight'
import { CollapseLeft } from '@styled-icons/open-iconic/CollapseLeft'
import { Tooltip } from '..'
import { Container, Inner, Header, Title, Body, Collapse, CollapseInner, Wrapper } from './styles'

const CollapseContext = React.createContext()

export default function Panel({ children, width, ...restProps }) { // resize = 'left' or 'right'
  const [ isCollapsed, setIsCollapsed ] = useState(false)
  const [ collapseDirection, setCollapseDirection ] = useState('')

  return (
    <CollapseContext.Provider value={{ isCollapsed, setIsCollapsed, collapseDirection, setCollapseDirection }}>
      <Wrapper width={width} {...restProps}>
        <Container width={width}  direction={collapseDirection} collapsed={isCollapsed}>
          <Inner width={width}>
            {children}
          </Inner>
        </Container>
      </Wrapper>
    </CollapseContext.Provider>
  )
}

Panel.Header = function PanelHeader({ children, ...restProps }) {
  return <Header {...restProps}>{children}</Header>
}

Panel.Title = function PanelTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>
}

Panel.Body = function PanelBody({ children, ...restProps }) {
  return <Body {...restProps}>{children}</Body>
}

Panel.Collapse = function PanelCollapse({ direction = 'right', ...restProps }) {
  const { isCollapsed, setIsCollapsed, setCollapseDirection } = useContext(CollapseContext)
  const [ tooltip, setTooltip ] = useState()

  const opposite = direction === 'left' ? 'right' : direction === 'right' ? 'left' : null

  useEffect(() => {
    setCollapseDirection(direction)
    isCollapsed ? setTooltip('expand') : setTooltip('collapse')
  }, [isCollapsed])

  const handleClick = () => {
    setIsCollapsed(prev => !prev)
  }

  return (
      <Collapse direction={direction} collapsed={isCollapsed} {...restProps}>
        <Tooltip tooltip={tooltip} side={opposite}>
          <CollapseInner onClick={handleClick}>
            { ((direction === 'right' && !isCollapsed) || (direction === 'left' && isCollapsed)) && <CollapseRight/>}
            { ((direction === 'left' && !isCollapsed) || (direction === 'right' && isCollapsed)) && <CollapseLeft/>}
          </CollapseInner>
        </Tooltip>
      </Collapse>
  )
}

