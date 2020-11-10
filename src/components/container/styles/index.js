import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  height: ${({ height }) => height || '100vh'};
`