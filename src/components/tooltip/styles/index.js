import styled from 'styled-components'


export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: ${({ align }) => align};
  align-items: ${({ align }) => align};
`

export const Tip = styled.span`
  display: flex;
  position: absolute;
  justify-content: ${({ align }) => align};
  align-items: ${({ align }) => align};
  background: #1e1e1e;
  padding: 0.3em 0.6em;
  border-radius: 0.4em;
  filter: drop-shadow(0 0 1px #fff);
  user-select: none;
  width: max-content;
  max-width: ${({ maxWidth }) => maxWidth};

  opacity: 0;
  transition: opacity 0.2s;

  ${({ side, separation, arrowLength }) => {
    let transform
    switch (side) {
      case 'top': {
        transform = `translateY(calc(-100% - ${separation} - ${arrowLength}))`
        break
      }
      case 'right': {
        transform = `translateX(calc(100% + ${separation} + ${arrowLength}))`
        break
      }
      case 'bottom': {
        transform = `translateY(calc(100% + ${separation} + ${arrowLength}))`
        break
      }
      case 'left': {
        transform = `translateX(calc(-100% - ${separation} - ${arrowLength}))`
        break
      }
    }

    return `
      ${side}: 0;
      transform: ${transform};
    `
  }}
`

export const Wrapper = styled.div`
  &:hover + ${Tip} {
    opacity: 1;
  }
`

export const Arrow = styled.div`
  position: absolute;
  width: 0; 
  height: 0; 

  ${({ side, arrowLength, arrowWidth }) => {
    let transform, oppositeSide
    switch (side) {
      case 'top': {
        transform = 'translateY(94%)'
        oppositeSide = 'bottom'
        break
      }
      case 'right': {
        transform = 'translateX(-94%)'
        oppositeSide = 'left'
        break
      }
      case 'bottom': {
        transform = 'translateY(-94%)'
        oppositeSide = 'top'
        break
      }
      case 'left': {
        transform = 'translateX(94%)'
        oppositeSide = 'right'
        break
      }
    }

    return `
      border-left: ${arrowWidth} solid transparent;
      border-top: ${arrowWidth} solid transparent;
      border-bottom: ${arrowWidth} solid transparent;
      border-right: ${arrowWidth} solid transparent;
      border-${side}: ${arrowLength} solid #1e1e1e;
      ${oppositeSide}: 0;
      transform: ${transform};
    `
  }}
`