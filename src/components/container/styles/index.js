import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  height: ${({ height }) => height || '100vh'};
`
