import React from "react"

// TODO this could be done much better...
function SvgComponent({ animate = true, customvalue, ...restProps }, svgRef) {
  const number = customvalue

  const dots = [
    <circle key='left-top' cx={117.0258789} cy={117.0263672} r={70} />,
    <circle key='left-center' cx={117.0258789} cy={278.5} r={70} />,
    <circle key='left-bottom' cx={117.0258789} cy={439.9746094} r={70} />,
    <circle key='right-top' cx={439.9746094} cy={117.0263672} r={70} />,
    <circle key='right-center' cx={439.9746094} cy={278.5} r={70} />,
    <circle key='right-bottom' cx={439.9746094} cy={439.9746094} r={70} />,
    <circle key='center' cx={278.5} cy={278.5} r={70} />,
  ]

  let face
  switch (number) {
    case 2: {
      face = [dots[2], dots[3]]
      break
    }
    case 3: {
      face = [dots[2], dots[3], dots[6]]
      break
    }
    case 4: {
      face = [dots[0], dots[2], dots[3], dots[5]]
      break
    }
    case 5: {
      face = [dots[0], dots[2], dots[3], dots[5], dots[6]]
      break
    }
    case 6: {
      face = [dots[0], dots[1], dots[2], dots[3], dots[4], dots[5]]
      break
    }
    default: {
      face = [dots[6]]
      break
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width={557}
      // height={557}
      viewBox="0 0 557 557"
      ref={svgRef}
      {...restProps}
    >
      <g>
        <rect
          x={4}
          y={4}
          width={549}
          height={549}
          rx={68}
          fill="currentColor"
          stroke="#000"
          strokeWidth={7}
        />
        {face.map(dot => dot)}
      </g>
    </svg>
  )
}

const ForwardRef = React.forwardRef(SvgComponent)
export default ForwardRef
