import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  ${({ align }) => (`
    align-items: ${align};
    justify-content: ${align};
  `)}
`

export const Tip = styled.p`
  display: flex;
  ${({ align }) => (`
    align-items: ${align};
    justify-content: ${align};
  `)}

  position: absolute;
  background: #1e1e1e;
  padding: 0.3em 0.6em;
  border-radius: 0.4em;
  filter: drop-shadow(0 0 2px white);
  user-select: none;
  width: max-content;
  max-width: ${({ maxWidth }) => maxWidth};
  // opacity: 0.6;
  // border: solid 1px;
  // box-shadow: 0 0 0 1px;

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