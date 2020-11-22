import React from 'react'
import * as piece from './pieces'
import * as board from './boards'

const Svgs = {
  piece,
  board
}

function Svg({ type='piece', game='chess', name='bishop', color='#fff', style, ...restProps }, ref) {

  let Component
  switch (type) {
    case 'piece': {
      Component = Svgs[type][game][name]
      break
    }
    case 'board': {
      Component = Svgs[type][game]
      break
    }
    default: {
      Component = Svgs[type]
      break
    }
  }

  return <Component ref={ref} style={{...style, color}}{...restProps} />
}

const ForwardRef = React.forwardRef(Svg)
export default ForwardRef