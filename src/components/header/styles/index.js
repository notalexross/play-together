import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  border-bottom: solid 1px #444;
  background-color: #252525;
  box-shadow: 0 0 10px #000;
  font-size: 1.3rem;
  font-weight: 700;

  @media (max-width: 800px) {
    z-index: 2;
    box-shadow: none;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
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
  text-transform: uppercase;
  user-select: none;
`

export const Text = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 0.2em;
  user-select: none;
`

export const TextCopy = styled.p`
  padding: 0.3em 0.6em;
  border: solid 1px #444;
  background-color: #1e1e1e;
  cursor: pointer;
  user-select: none;
`
