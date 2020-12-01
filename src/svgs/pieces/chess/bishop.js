import * as React from "react"

function SvgComponent(props, svgRef) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width={45}
      // height={45}
      // viewBox="0 0 45 45"
      viewBox="3 4 39 37.5"
      ref={svgRef}
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g fill="currentColor" strokeLinecap="butt">
          <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z" />
          <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
          <path d="M25 8a2.5 2.5 0 11-5 0 2.5 2.5 0 115 0z" />
        </g>
        <path
          d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5"
          strokeLinejoin="miter"
        />
      </g>
    </svg>
  )
}

const ForwardRef = React.forwardRef(SvgComponent)
export default ForwardRef
