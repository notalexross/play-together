import * as React from "react"

function SvgComponent(props, svgRef) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={810}
      height={810}
      viewBox="-0.05 -0.05 8.1 8.1"
      ref={svgRef}
      {...props}
    >
      <path d="M-.5-.5h9v9h-9z" />
      <path
        fill="currentColor"
        d="M0 0h8v1H0zm0 2h8v1H0zm0 2h8v1H0zm0 2h8v1H0zm1-6v8h1V0zm2 0v8h1V0zm2 0v8h1V0zm2 0v8h1V0z"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(SvgComponent)
export default ForwardRef
