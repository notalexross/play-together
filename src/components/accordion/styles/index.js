import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  background: #252525;
  border: solid 1px;
  width: 300px;
`;

export const Item = styled.div``;

export const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  border-top: solid 1px;
`;

export const Body = styled.div`
  user-select: none;
  padding: 0.25em 1em 0.5em 1em;
  background: #1e1e1e
`;

export const IconWrapper = styled.div`
  width: 24px;
  line-height: 0;
`;