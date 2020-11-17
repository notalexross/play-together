import styled, { keyframes } from 'styled-components'

const drop = keyframes`
  from {
    transform: translateY(-20px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  z-index: 100;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.6);
  color: #000;

  animation: ${fadeIn} 0.1s linear 1;
`

export const Container = styled.section`
  position: relative;
  background: white;
  padding: 1.5rem;
  border-radius: 0.4rem;

  animation: ${drop} 0.1s linear 1;
`

export const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  line-height: 0;
  width: 20px;

  &:hover {
    cursor: pointer;
  };
`

export const Title = styled.h1``

export const Text = styled.p``

export const Form = styled.form``

export const Submit = styled.button``

export const InputText = styled.input`
  font-family: inherit;
  padding: 0.5em 1em;
`