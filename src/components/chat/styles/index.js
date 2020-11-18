// TODO
import styled from 'styled-components'

export const Container = styled.div`
  background: #252525;
  display: flex;
  flex-direction: column-reverse;
  box-sizing: border-box;
  // border-left: solid 1px #444;
  height: 100%;
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
  background: #1e1e1e;
  color: inherit;

  @media (max-width: 800px) {
    margin: 0 0 0 0.5em;
  }
`

export const TextInput = styled.textarea`
  box-sizing: border-box;
  background: #1e1e1e;
  border: none;
  padding: 1rem;
  resize: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  line-height: 1.5;
  border-radius: 6px;
  flex-grow: 1;

  @media (max-width: 800px) {
    padding: 0.6rem 1rem;
  }
`

export const Error = styled.p`
  padding: 0.5rem 1rem;
  background: #290000;
  color: #ff8080;
`

export const Log = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse; // can't just use "justify-content: flex-end" as no scrollbar will appear
  min-height: 4em;

  @media (max-width: 800px) {
    ${({ isExpanded }) => !isExpanded && 'display: none;'}
  }
`

export const LogInner = styled.div`

`

export const Message = styled.div`
  margin: 0.5em 1em 0;
  &:last-of-type {
    margin-bottom: 1em;
  }
  border-radius: 10px;

  @media (max-width: 800px) {
    font-size: 20px;
    background: #111;
    padding: 1em;
  }
`

export const Timestamp = styled.span`
  margin-right: 0.4em;
  color: #444;
`

export const Sender = styled.span`
  margin-right: 0.2em;
  color: ${({ color }) => color};
  &:after {
    content: ': ';
    color: #e5e5e5;
  }
`

export const Text = styled.span``

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: inherit;
  margin: 0.5em 0.2em;
  justify-content: flex-end;

  @media (max-width: 800px) {
    flex-direction: row;
  }
`