import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  height: ${({ height }) => height || '100vh'};
  // min-height: -webkit-fill-available; // this prevents address bar from affecting the height on chrome for android
  // max-height: -webkit-fill-available; // this prevents address bar from affecting the height on chrome for android
`