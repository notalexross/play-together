// TODO
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #252525;
  border-bottom: solid 1px #e5e5e555;
  padding: 1em;
`

export const HomeLink = styled(Link)`
  color: inherit;
  user-select: none;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Text = styled.p`
  margin-right: 0.2em;
  user-select: none;
`

export const TextCopy = styled.span`
  background: #1e1e1e;
  border: solid 1px #e5e5e555;
  padding: 0.3em 0.6em;
  cursor: pointer;
  user-select: none;
`