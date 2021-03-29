import * as React from 'react'

function SvgComponent(props, svgRef) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -26 689 1062.4" ref={svgRef} {...props}>
      <path
        d="M304.66 1.707c-111.06 0-201.06 85.329-201.06 190.64 0 78.193 49.628 145.36 120.66 174.78l-69.52 172.96L1.71 921.127h1.434c-.79 2.357-1.195 4.724-1.195 7.136 0 44.187 135.38 79.97 302.48 79.97s302.6-35.782 302.6-79.97c0-.653-.06-1.277-.12-1.926h.837l-1.792-4.53c-.358-1.177-.766-2.351-1.314-3.512L457.7 542.685l-69.17-177.04c69.18-30.15 117.31-96.38 117.31-173.31 0-105.3-90.11-190.63-201.18-190.63z"
        stroke="#000"
        strokeWidth={50}
        fill="currentColor"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(SvgComponent)
export default ForwardRef
