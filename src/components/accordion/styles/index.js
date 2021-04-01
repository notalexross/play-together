import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  box-sizing: border-box;
  height: 100%;
`

export const Item = styled.div`
  border-top: solid 1px #444;

  &:last-of-type {
    border-bottom: solid 1px #444;
  }

  &:first-of-type {
    border-top: none;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  background: #252525;

  &:hover {
    background: #555;
  }
`

export const Body = styled.div`
  background: #1e1e1e;
  border-top: solid 1px #444;

  &:hover {
    background: #555;
  }
`

export const BodyInner = styled.span.attrs(({ href }) => ({ as: href && 'a' }))`
  display: block;
  user-select: none;
  padding: 0.25em 1em 0.5em 1em;
  cursor: pointer;
  color: inherit;
`

export const IconWrapper = styled.div`
  width: 24px;
  line-height: 0;
`
