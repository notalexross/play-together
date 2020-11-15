import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  box-sizing: border-box;
  // border-right: solid 1px #444;
  height: 100%;
  // width: 300px;
  // margin-left: -1000px;
`;

export const Item = styled.div`
  border-top: solid 1px #444;
  &:last-of-type {
    border-bottom: solid 1px #444;
  }
  &:first-of-type {
    border-top: none;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  background: #252525;

  &:hover {
    background: #ffffff55;
  }
`;

export const Body = styled.div`
  user-select: none;
  padding: 0.25em 1em 0.5em 1em;
  background: #1e1e1e;
  border-top: solid 1px #444;
`;

export const IconWrapper = styled.div`
  width: 24px;
  line-height: 0;
`;