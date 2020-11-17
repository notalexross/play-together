// TODO
import styled from 'styled-components'

export const Panels = styled.div`
  display: flex;
  // background: #1e1e1e;
  flex-grow: 1;
  overflow: auto;
  position: relative;
  height: 100%;
`

export const Wrapper = styled.div`
  position: relative;
  ${({ width }) => !width && 'flex-grow: 1;'}
`

// transition max-width instead of width, as max width wont change responsively.
// if use width for transition then animation will play when change from small to large width.
export const Container = styled.section`
  height: 100%;
  ${({ shouldTransition }) => shouldTransition && 'transition: max-width 0.2s;'}
  // ${({ shouldTransition }) => shouldTransition && 'transition: width 0.2s;'}
  // transition: width 0.2s;
  max-width: ${({ collapsed, width }) => collapsed ? '0' : width};
  // width: ${({ collapsed, width }) => collapsed ? '0' : width};
  // max-width: 100%;

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
  // border: solid 1px #444;
  display: Flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  direction: ltr;
  
  width: ${({ width }) => width ? width : '100%'};
  // width: 100%;
`

export const Header = styled.div`
  border-bottom: solid 1px #444;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1e1e1e;
`

export const Title = styled.h1`
  padding: 0.5em;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  user-select: none;
`

export const Body = styled.div`
  flex-grow: 1;
  overflow: auto;
`

export const Collapse = styled.div`
  z-index: 1;
  position: absolute;
  // width: 20px;
  // line-height: 0;
  // padding: 0.5em;
  // border-radius: 4px;
  transition: transform 0.2s;

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
`

export const CollapseInner = styled.div`
  width: 20px;
  line-height: 0;
  padding: 0.5em;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background: #ffffff55;
  }
`