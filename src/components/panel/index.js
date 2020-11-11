// TODO
import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CollapseRight } from '@styled-icons/open-iconic/CollapseRight'
import { CollapseLeft } from '@styled-icons/open-iconic/CollapseLeft'
import { Container, Inner, Header, Title, Body, Collapse, Wrapper } from './styles'

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
  const { isCollapsed, setIsCollapsed, collapseDirection, setCollapseDirection } = useContext(CollapseContext)

  useEffect(() => {
    setCollapseDirection(direction)
  }, [])

  const handleClick = () => {
    setIsCollapsed(prev => !prev)
  }

  return (
    <Collapse direction={collapseDirection} collapsed={isCollapsed} onClick={handleClick} {...restProps}>
      { ((direction === 'right' && !isCollapsed) || (direction === 'left' && isCollapsed)) && <CollapseRight />}
      { ((direction === 'left' && !isCollapsed) || (direction === 'right' && isCollapsed)) && <CollapseLeft />}
    </Collapse>
)
}

