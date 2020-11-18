// TODO
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.header`
  // display: flex;
  justify-content: space-between;
  align-items: center;
  tex-align: center;
  justify-items: center;

  display: flex;

  background: #252525;
  border: solid 1px #444;
  padding: 1em;

  box-shadow: 0 0 10px #000;

  @media (max-width: 800px) {
    z-index: 2;
    box-shadow: none;
  }
`

export const HomeLink = styled(Link)`
  color: inherit;
  user-select: none;
`

export const Text = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0.2em;
  align-items: center;
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