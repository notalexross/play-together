import styled from 'styled-components'

export const Container = styled.div`
  width: ${({ width }) => width || '20px' };
  line-height: 0;

  ${({ noPointer }) => (
    !noPointer && `
      &:hover {
        cursor: pointer;
      };
    `
  )}
`