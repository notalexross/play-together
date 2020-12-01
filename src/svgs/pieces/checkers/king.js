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
        <path
          transform="scale(0.0012) translate(-75 160)"
          d="M493.052 135.391c-17.088 14.982-19.637 34.977-18.074 51.51-1.147-.253-2.392-.3-3.615-.3-9.069 0-16.417 7.347-16.417 16.416 0 9.07 7.348 16.417 16.417 16.417 3.954 0 7.71-1.437 10.543-3.765l.603 1.506c-15.771 47.826-53.296 24.096-66.421 10.543 3.836-2.037 6.476-6.047 6.476-10.693 0-6.7-5.35-12.2-12.05-12.2-6.699 0-12.199 5.5-12.199 12.2 0 6.7 5.5 12.049 12.2 12.049.29 0 .467.02.753 0-3.243 36.26-25.193 52.461-54.824 13.555.449.05 1.044 0 1.506 0 6.7 0 12.05-5.5 12.05-12.2 0-6.7-5.35-12.049-12.05-12.049-5.565 0-10.32 3.777-11.748 8.886-6.45-10.29-36.454-16.887-26.056-8.434 26.192 21.293 59.493 94.887 59.493 94.887h.15c8.776-23.023 56.485-40.666 114.016-40.666 57.526 0 105.083 17.646 113.864 40.666h.15c6.682-14.291 35.04-76.232 57.987-94.887 10.399-8.453-19.606-1.855-26.056 8.434-1.428-5.11-6.032-8.886-11.597-8.886-6.7 0-12.2 5.35-12.2 12.05 0 6.699 5.5 12.2 12.2 12.2.462 0 .906.05 1.355 0-29.63 38.905-51.58 22.705-54.824-13.556.286.02.614 0 .904 0 6.7 0 12.05-5.35 12.05-12.05 0-6.7-5.35-12.2-12.05-12.2-6.7 0-12.2 5.5-12.2 12.2 0 4.647 2.64 8.657 6.477 10.694-13.125 13.553-50.5 37.283-66.27-10.543l.602-1.506c2.834 2.328 6.439 3.765 10.392 3.765 9.07 0 16.417-7.347 16.417-16.417 0-9.069-7.348-16.417-16.417-16.417-1.223 0-2.468.049-3.615.302 1.563-16.534-.835-36.529-17.923-51.51z"
        />
      </g>
    </svg>
  )
}

const ForwardRef = React.forwardRef(SvgComponent)
export default ForwardRef
