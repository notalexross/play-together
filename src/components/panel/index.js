import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CollapseRight } from '@styled-icons/open-iconic/CollapseRight'
import { CollapseLeft } from '@styled-icons/open-iconic/CollapseLeft'
import { Tooltip } from '..'
import {
  Panels,
  Container,
  Inner,
  Header,
  Title,
  Body,
  Collapse,
  CollapseInner,
  Wrapper
} from './styles'
import { windowContext } from '../../context/window'

const CollapseContext = React.createContext()

export default function Panel({ children, innerRef, width, startCollapsed = false, ...restProps }) {
  const [isCollapsed, setIsCollapsed] = useState(startCollapsed)
  const [collapseDirection, setCollapseDirection] = useState('')
  const { windowWidth } = useContext(windowContext)

  const isSmall = windowWidth <= 800

  useEffect(() => {
    isSmall ? setIsCollapsed(false) : setIsCollapsed(startCollapsed)
  }, [isSmall, setIsCollapsed, startCollapsed])

  return (
    <Wrapper ref={innerRef} width={width} {...restProps}>
      <CollapseContext.Provider
        value={{ isCollapsed, setIsCollapsed, collapseDirection, setCollapseDirection }}
      >
        <Container width={width} direction={collapseDirection} collapsed={isCollapsed}>
          <Inner width={width}>{children}</Inner>
        </Container>
      </CollapseContext.Provider>
    </Wrapper>
  )
}

Panel.propTypes = {
  innerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  width: PropTypes.string,
  startCollapsed: PropTypes.bool
}

Panel.Container = React.forwardRef(({ children, ...restProps }, ref) => {
  return (
    <Panels ref={ref} {...restProps}>
      {children}
    </Panels>
  )
})

Panel.Header = function PanelHeader({ children, innerRef, ...restProps }) {
  return (
    <Header ref={innerRef} {...restProps}>
      {children}
    </Header>
  )
}

Panel.Header.propTypes = {
  innerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
}

Panel.Title = function PanelTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>
}

Panel.Body = function PanelBody({ children, ...restProps }) {
  return <Body {...restProps}>{children}</Body>
}

Panel.Collapse = function PanelCollapse({ direction = 'right', ...restProps }) {
  const { isCollapsed, setIsCollapsed, setCollapseDirection } = useContext(CollapseContext)
  const [tooltip, setTooltip] = useState()

  const opposite = direction === 'left' ? 'right' : direction === 'right' ? 'left' : null

  const handleClick = () => {
    setIsCollapsed(prev => !prev)
  }

  useEffect(() => {
    setCollapseDirection(direction)
    isCollapsed ? setTooltip('expand') : setTooltip('collapse')
  }, [isCollapsed, direction, setCollapseDirection, setTooltip])

  return (
    <Collapse direction={direction} collapsed={isCollapsed} {...restProps}>
      <Tooltip tooltip={tooltip} side={opposite}>
        <CollapseInner onClick={handleClick}>
          {((direction === 'right' && !isCollapsed) || (direction === 'left' && isCollapsed)) && (
            <CollapseRight />
          )}
          {((direction === 'left' && !isCollapsed) || (direction === 'right' && isCollapsed)) && (
            <CollapseLeft />
          )}
        </CollapseInner>
      </Tooltip>
    </Collapse>
  )
}

Panel.Collapse.propTypes = {
  direction: PropTypes.oneOf(['left', 'right'])
}
