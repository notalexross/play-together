import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  background: #252525;
  border: solid 1px;
  width: 300px;
  height: 500px;
`;

export const Item = styled.div`
  border-top: solid 1px #e5e5e533;
  &:last-of-type {
    border-bottom: solid 1px #e5e5e533;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

export const Body = styled.div`
  user-select: none;
  padding: 0.25em 1em 0.5em 1em;
  background: #1e1e1e;
  border-top: solid 1px #e5e5e533;
`;

export const IconWrapper = styled.div`
  width: 24px;
  line-height: 0;
`;