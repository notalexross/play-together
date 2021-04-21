import styled, { keyframes } from 'styled-components'

const drop = keyframes`
  from {
    transform: translateY(-20px);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const Overlay = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
  color: #000;
  animation: ${fadeIn} 0.1s linear 1;
`

export const Container = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  padding: 2rem;
  border-radius: 0.4rem;
  background-color: white;
  user-select: none;
  animation: ${drop} 0.1s linear 1;
`

export const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  line-height: 0;

  &:hover {
    cursor: pointer;
  }
`

export const Title = styled.h1``

export const Text = styled.p`
  font-size: 1.3rem;
`

export const Subtext = styled.p`
  margin-top: 0.2rem;
  opacity: 0.8;
  font-size: 1.2rem;
`

export const Form = styled.form`
  margin-top: 1rem;
`

export const Submit = styled.button`
  margin: 0;
`

export const InputText = styled.input`
  padding: 0.8rem 1.2rem;
  font-family: inherit;
`
