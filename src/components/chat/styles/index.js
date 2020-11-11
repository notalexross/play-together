// TODO
import styled from 'styled-components'

export const Container = styled.div`
  background: #252525;
  display: flex;
  flex-direction: column-reverse;
  box-sizing: border-box;
  // border-left: solid 1px #e5e5e533;
  height: 100%;
  // width: 300px;
  // margin-right: -1000px;
`

export const SendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const Send = styled.button`
  margin: 1em 2em;
  padding: 0.5em 1.25em;
  border: none;
  border-radius: 0.4em;
  background: #1e1e1e;
  color: inherit;
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
  margin: 0 0.2em;
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
  height: 0;
  min-height: 4em;
`

export const LogInner = styled.div`

`

export const Message = styled.div`
  margin: 0.5em 1em 0;
  &:last-of-type {
    margin-bottom: 1em;
  }
`

export const Timestamp = styled.span`
  margin-right: 0.4em;
  color: #e5e5e555;
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
  width: 100%;
  background: inherit;
`