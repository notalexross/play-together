import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  width: ${({ width }) => width || '1em'};
  line-height: 0;

  &:hover {
    cursor: ${({ noPointer }) => !noPointer && 'pointer'};
  }
`
