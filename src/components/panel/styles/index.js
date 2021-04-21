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
  z-index: 1;
  box-shadow: 0 0 10px #000;
`

export const Container = styled.section`
  position: relative;
  height: 100%;
  max-width: ${({ collapsed, width }) => (collapsed ? '0' : width)};
  transition: max-width 0.2s;
  direction: ${({ direction }) => (direction === 'left' ? 'rtl' : 'ltr')};

  @media (max-width: 800px) {
    transition: none;
  }
`

export const Inner = styled.div`
  display: Flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  width: ${({ width }) => width || '100%'};
  direction: ltr;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-bottom: solid 1px #444;
  background-color: #1e1e1e;
`

export const Title = styled.h1`
  padding: 1em;
  font-size: 1.3rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  user-select: none;
`

export const Body = styled.div`
  flex-grow: 1;
  height: 100%;
  overflow: auto;
`

export const Collapse = styled.div`
  position: absolute;
  z-index: 1;
  ${({ direction }) => (direction === 'left' ? 'right' : 'left')}: 0.5em;
  transform: ${({ collapsed, direction }) => {
    if (!collapsed) return ''
    return direction === 'left' ? 'translateX(3em)' : 'translateX(-3em)'
  }};
  transition: transform 0.2s;
`

export const CollapseInner = styled.div`
  width: 20px;
  padding: 0.5em;
  border-radius: 4px;
  line-height: 0;

  &:hover {
    cursor: pointer;
    background: #ffffff55;
  }

  @media (max-width: 800px) {
    display: none;
  }
`
