import * as React from 'react'

function SvgComponent(props, svgRef) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="3 5 39 36.5" ref={svgRef} {...props}>
      <g
        fill="currentColor"
        fillRule="evenodd"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g fill="currentColor" stroke="none">
          <circle cx={6} cy={12} r={2.75} />
          <circle cx={14} cy={9} r={2.75} />
          <circle cx={22.5} cy={8} r={2.75} />
          <circle cx={31} cy={9} r={2.75} />
          <circle cx={39} cy={12} r={2.75} />
        </g>
        <path
          d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5 9 26z"
          strokeLinecap="butt"
        />
        <path
          d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"
          strokeLinecap="butt"
        />
        <path d="M11 38.5a35 35 1 0023 0" fill="none" strokeLinecap="butt" />
        <path
          d="M11 29a35 35 1 0123 0M12.5 31.5h20M11.5 34.5a35 35 1 0022 0M10.5 37.5a35 35 1 0024 0"
          fill="none"
          stroke="#fff"
        />
      </g>
    </svg>
  )
}

const ForwardRef = React.forwardRef(SvgComponent)
export default ForwardRef
