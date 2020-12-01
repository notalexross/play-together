import * as React from "react"

function SvgComponent(props, svgRef) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width={45}
      // height={45}
      // viewBox="0 0 45 45"
      viewBox="3 5 39 36.5"
      ref={svgRef}
      {...props}
    >
      <g
        fill="currentColor"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5"
          strokeLinecap="butt"
        />
        <path d="M34 14l-3 3H14l-3-3" />
        <path
          d="M31 17v12.5H14V17"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" />
        <path d="M11 14h23" fill="none" strokeLinejoin="miter" />
      </g>
    </svg>
  )
}

const ForwardRef = React.forwardRef(SvgComponent)
export default ForwardRef
