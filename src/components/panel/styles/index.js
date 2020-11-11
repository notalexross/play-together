// TODO
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  ${({ width }) => !width && 'flex-grow: 1'}
`

export const Container = styled.section`
  height: 100%;
  overflow: hidden;
  transition: width 0.5s;

  width: ${({ collapsed, width }) => collapsed ? '0' : width};

  ${({ direction }) => {
    switch(direction) {
      case 'left': {
        return 'direction: rtl;'
      }
      case 'right': {
        return 'direction: ltr;'
      }
    }
  }}
`

export const Inner = styled.div`
  border: solid 1px #e5e5e533;
  display: Flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  direction: ltr;

  width: ${({ width }) => width ? width : '100%'};
`

export const Header = styled.div`
  border-bottom: solid 1px #e5e5e533;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Title = styled.h1`
  padding: 0.5em;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  user-select: none;
`

export const Body = styled.div`
  flex-grow: 1;
`

export const Collapse = styled.div`
  z-index: 1;
  position: absolute;
  width: 20px;
  line-height: 0;
  padding: 0.5em;
  border-radius: 4px;
  transition: transform 0.5s;

  ${({ direction, collapsed }) => {
    let opposite, offset;
    switch(direction) {
      case 'left': {
        opposite = 'right'
        offset = '3em'
        break
      }
      case 'right': {
        opposite = 'left'
        offset = '-3em'
        break
      }
    }
    return `
      ${opposite}: 0.5em;
      transform: translateX(${collapsed ? offset : '0'});
    `
  }}

  &:hover {
    background: #ffffff55;
  }
`