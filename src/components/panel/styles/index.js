import styled from 'styled-components'

export const Panels = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow: hidden;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

export const Wrapper = styled.div`
  ${({ width }) => !width && 'flex-grow: 1;'}
  box-shadow: 0 0 10px #000;
  z-index: 1;
`

// transition max-width instead of width, as max width wont change responsively.
// if use width for transition then animation will play when change from small to large width.
export const Container = styled.section`
  position: relative;
  height: 100%;
  transition: max-width 0.2s;
  max-width: ${({ collapsed, width }) => (collapsed ? '0' : width)};

  ${({ direction }) => {
    switch (direction) {
      case 'left': {
        return 'direction: rtl;'
      }
      case 'right': {
        return 'direction: ltr;'
      }
      default:
        return ''
    }
  }}

  @media (max-width: 800px) {
    transition: none;
  }
`

export const Inner = styled.div`
  display: Flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  direction: ltr;
  width: ${({ width }) => width || '100%'};
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
  padding: 1em;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  user-select: none;
  font-size: 1.3rem;
`

export const Body = styled.div`
  flex-grow: 1;
  height: 100%;
  overflow: auto;
`

export const Collapse = styled.div`
  z-index: 1;
  position: absolute;
  transition: transform 0.2s;

  ${({ direction, collapsed }) => {
    let opposite
    let offset
    switch (direction) {
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
      default:
        break
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

  @media (max-width: 800px) {
    display: none;
  }
`
