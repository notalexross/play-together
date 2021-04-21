import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  background-color: #1e1e1e;
`

export const Item = styled.div`
  border-top: solid 1px #444;

  &:first-of-type {
    border-top: none;
  }

  &:last-of-type {
    border-bottom: solid 1px #444;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  background-color: #252525;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #555;
  }
`

export const Body = styled.div`
  background-color: #1e1e1e;
  border-top: solid 1px #444;

  &:hover {
    background: #555;
  }
`

export const BodyInner = styled.span.attrs(({ href }) => ({ as: href && 'a' }))`
  display: block;
  padding: 0.25em 1em 0.5em 1em;
  color: inherit;
  cursor: pointer;
  user-select: none;
`

export const IconWrapper = styled.div`
  width: 24px;
  line-height: 0;
`
