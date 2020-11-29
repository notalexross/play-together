// TODO
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // text-align: center;
  // justify-items: center;


  background: #252525;
  border-bottom: solid 1px #444;

  font-size: 1.3rem;
  font-weight: 700;
  padding: 1em;

  box-shadow: 0 0 10px #000;

  @media (max-width: 800px) {
    z-index: 2;
    box-shadow: none;
  }
`

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  &:first-child > * {
    margin-right: auto;
  }
  &:last-child > * {
    margin-left: auto;
  }
`

export const HomeLink = styled(Link)`
  color: inherit;
  user-select: none;
  text-transform: uppercase;
`

export const Text = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 0.2em;

  user-select: none;
`

export const TextCopy = styled.p`
  background: #1e1e1e;
  border: solid 1px #444;
  padding: 0.3em 0.6em;
  padding: 0.3em 0.6em;
  cursor: pointer;
  user-select: none;
`