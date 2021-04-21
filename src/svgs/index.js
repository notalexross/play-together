import React from 'react'
import PropTypes from 'prop-types'
import * as piece from './pieces'
import * as board from './boards'

const Svgs = {
  piece,
  board
}

const Svg = React.forwardRef((
  {
    type = 'piece',
    game = 'chess',
    name = 'bishop',
    color = '#fff',
    style = {},
    customValue = undefined,
    ...restProps
  },
  ref
) => {
  let Component
  switch (type) {
    case 'piece': {
      Component = Svgs[type] && Svgs[type][game] && Svgs[type][game][name]
      break
    }
    case 'board': {
      Component = Svgs[type] && Svgs[type][game]
      break
    }
    default: {
      Component = Svgs[type]
      break
    }
  }

  Component = Component || Svgs.piece.chess.bishop

  return (
    <Component ref={ref} customvalue={customValue} style={{ ...style, color }} {...restProps} />
  )
})

Svg.propTypes = {
  type: PropTypes.string,
  game: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  customValue: PropTypes.number
}

export default Svg
