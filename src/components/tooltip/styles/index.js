import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  position: relative;
  align-items: ${({ align }) => align};
  justify-content: ${({ align }) => align};
`

export const Tip = styled.span`
  display: flex;
  position: absolute;
  align-items: ${({ align }) => align};
  justify-content: ${({ align }) => align};
  ${({ side }) => `${side}: 0;`}
  ${({ side, separation, arrowLength }) => {
    switch (side) {
      case 'right': {
        return `transform: translateX(calc(100% + ${separation} + ${arrowLength}));`
      }
      case 'bottom': {
        return `transform: translateY(calc(100% + ${separation} + ${arrowLength}));`
      }
      case 'left': {
        return `transform: translateX(calc(-100% - ${separation} - ${arrowLength}));`
      }
      default: {
        return `transform: translateY(calc(-100% - ${separation} - ${arrowLength}));`
      }
    }
  }}
  width: max-content;
  max-width: ${({ maxWidth }) => maxWidth};
  padding: 0.3em 0.6em;
  border-radius: 0.4em;
  background-color: #1e1e1e;
  filter: drop-shadow(0 0 1px #fff);
  opacity: 0;
  line-height: initial;
  pointer-events: none;
  user-select: none;
`

export const Wrapper = styled.div`
  &:hover + ${Tip} {
    opacity: 1;
    transition: opacity 0.2s;
    transition-delay: 0.2s;
  }
`

export const Arrow = styled.div`
  position: absolute;
  ${({ side }) => {
    switch (side) {
      case 'right': {
        return 'left: 0;\ntransform: translateX(-94%);'
      }
      case 'bottom': {
        return 'top: 0;\ntransform: translateY(-94%);'
      }
      case 'left': {
        return 'right: 0;\ntransform: translateX(94%);'
      }
      default: {
        return 'bottom: 0;\ntransform: translateY(94%);'
      }
    }
  }}
  width: 0;
  height: 0;
  border-left: ${({ arrowWidth }) => arrowWidth} solid transparent;
  border-top: ${({ arrowWidth }) => arrowWidth} solid transparent;
  border-bottom: ${({ arrowWidth }) => arrowWidth} solid transparent;
  border-right: ${({ arrowWidth }) => arrowWidth} solid transparent;
  border-${({ side, arrowLength }) => `${side}: ${arrowLength} solid #1e1e1e`};
`
