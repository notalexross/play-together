import * as React from "react"

function SvgComponent(props, svgRef) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width={1}
      // height={1}
      viewBox="0.171 0.224 0.657 0.622"
      ref={svgRef}
      {...props}
    >
      <g stroke="#000" strokeWidth={0.03}>
        <ellipse
          cx={0.5}
          cy={0.5}
          rx={0.313}
          ry={0.26}
          transform="translate(0 .07)"
        />
        <ellipse cx={0.5} cy={0.5} rx={0.313} ry={0.26} fill="currentColor" />
      </g>
    </svg>
  )
}

const ForwardRef = React.forwardRef(SvgComponent)
export default ForwardRef
