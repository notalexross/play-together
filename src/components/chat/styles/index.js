import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  box-sizing: border-box;
  height: 100%;
  background-color: #252525;
`

export const SendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const Send = styled.button`
  margin: 1em 2em 0.5em;
  padding: 0.5em 1.25em;
  border: none;
  border-radius: 6px;
  background-color: #1e1e1e;
  color: inherit;

  @media (max-width: 800px) {
    margin: 0 0 0 0.5em;
  }
`

export const TextInput = styled.textarea`
  flex-grow: 1;
  box-sizing: border-box;
  padding: 1rem;
  border: none;
  border-radius: 6px;
  background-color: #1e1e1e;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: 1.5;
  resize: none;
  overflow-x: hidden; // overrides firefox extra height

  @media (max-width: 800px) {
    padding: 0.6rem 1rem;
  }
`

export const Error = styled.p`
  padding: 0.5rem 1rem;
  background-color: #290000;
  color: #ff8080;
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-height: 50%;
  border-bottom: solid 1px #444;
  background-color: #1e1e1e;
  text-align: center;

  @media (max-width: 800px) {
    ${({ isExpanded }) => !isExpanded && 'display: none;'}
  }
`

export const Log = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  box-sizing: border-box;
  min-height: 7em;

  @media (max-width: 800px) {
    ${({ isExpanded }) => !isExpanded && 'display: none;'}
  }
`

export const LogInner = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`

export const Message = styled.div`
  margin: 0.5em 1em 0;
  border-radius: 10px;
  word-wrap: break-word;

  &:last-of-type {
    margin-bottom: 1em;
  }

  @media (max-width: 800px) {
    padding: 1em;
    background-color: #111;
  }
`

export const Timestamp = styled.span`
  margin-right: 0.4em;
  color: #777;
`

export const Sender = styled.span`
  margin-right: 0.2em;
  color: ${({ color }) => color};
  font-weight: 700;

  &:after {
    content: ': ';
    color: #e5e5e5;
  }
`

export const Text = styled.span``

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0.5em 0.2em;
  background-color: inherit;

  @media (max-width: 800px) {
    flex-direction: row;
  }
`

export const List = styled.div`
  ${({ isExpanded }) => !isExpanded && 'display: none;'}
  max-height: 100%;
  text-align: center;
  overflow: auto;
`

export const User = styled.p`
  margin-bottom: 0.5em;
  color: ${({ color }) => color};
  font-weight: 700;
`

export const Heading = styled.div`
  cursor: pointer;
  user-select: none;
`

export const HeadingInner = styled.h1`
  padding: 0.4em;
  font-size: 1.3rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`
