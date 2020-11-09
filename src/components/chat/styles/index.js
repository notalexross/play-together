// TODO
import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 400px;
  height: 400px;
  background: #252525;
  border: solid;

  // display: grid;
  // grid-template-rows: auto auto;
  display: flex;
  flex-direction: column-reverse;
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
  background: black;
  color: inherit;
`

export const Message = styled.textarea`
  box-sizing: border-box;
  background: #1e1e1e;
  border: none;
  padding: 1rem;
  resize: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  line-height: 1.5;


  // white-space: pre-wrap;
  // overflow-wrap: break-word;
`

export const Error = styled.p`
  padding: 0.5rem 1rem;
  background: #290000;
  color: #ff8080;
`

export const Log = styled.div`
  box-sizing: border-box;
  background: green;
  height: 200px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: inherit;
  // vertical-align: baseline;
`