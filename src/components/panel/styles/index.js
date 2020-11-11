// TODO
import styled from 'styled-components'

export const Container = styled.section`
  position: relative;
`

export const Inner = styled.div`
  border: solid 1px #e5e5e533;
  display: Flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  width: ${({ width }) => width ? width : '100%'};
`

export const Header = styled.div`
  border-bottom: solid 1px #e5e5e533;
  text-align: center;
`

export const Title = styled.h1`
  padding: 0.5em;
`

export const Body = styled.div`
  flex-grow: 1;
`