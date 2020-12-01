import * as React from "react"

function SvgComponent(props, svgRef) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width={383}
      // height={383}
      // viewBox="0 0 383 383"
      viewBox="11 11 361 361"
      ref={svgRef}
      {...props}
    >
      <path fill="currentColor" d="M11.5 11.5h360v360h-360z" />
      <path d="M155.5 347.5h48v-120h24l-36-36-36 36h24v96h-24v24" fill="#ff0" />
      <path d="M35.5 155.5v48h120v24l36-36-36-36v24h-96v-24h-24" fill="#0f0" />
      <path d="M227.5 35.5h-48v120h-24l36 36 36-36h-24v-96h24v-24" fill="red" />
      <path
        d="M347.5 227.5v-48h-120v-24l-36 36 36 36v-24h96v24h24"
        fill="#00f"
      />
      <path fill="#ff0" d="M11.5 227.5h144v144h-144z" />
      <path fill="#0f0" d="M11.5 11.5h144v144h-144z" />
      <path fill="red" d="M227.5 11.5h144v144h-144z" />
      <path fill="#00f" d="M227.5 227.5h144v144h-144z" />
      <path fill="none" stroke="#000" d="M11.5 11.5h360v360h-360z" />
      <g fill="none" stroke="#000" strokeWidth={0.5}>
        <path d="M155.5 371.5v-144M155.5 227.5h72M155.5 251.5h72M155.5 275.5h72M155.5 299.5h72M155.5 323.5h72M155.5 347.5h72M179.5 371.5v-144M203.5 371.5v-144M227.5 371.5v-144" />
        <g>
          <path d="M11.5 155.5h144M155.5 155.5v72M131.5 155.5v72M107.5 155.5v72M83.5 155.5v72M59.5 155.5v72M35.5 155.5v72M11.5 179.5h144M11.5 203.5h144M11.5 227.5h144" />
        </g>
        <g>
          <path d="M227.5 11.5v144M227.5 155.5h-72M227.5 131.5h-72M227.5 107.5h-72M227.5 83.5h-72M227.5 59.5h-72M227.5 35.5h-72M203.5 11.5v144M179.5 11.5v144M155.5 11.5v144" />
        </g>
        <g>
          <path d="M371.5 227.5h-144M227.5 227.5v-72M251.5 227.5v-72M275.5 227.5v-72M299.5 227.5v-72M323.5 227.5v-72M347.5 227.5v-72M371.5 203.5h-144M371.5 179.5h-144M371.5 155.5h-144" />
        </g>
        <path d="M155.5 227.5l72-72M155.5 155.5l72 72" />
      </g>
      <g stroke="#000" strokeWidth={0.5}>
        <path d="M83.5 227.5l72 72-72 72-72-72 72-72z" fill="currentColor" />
        <path d="M83.5 251.5l48 48-48 48-48-48 48-48z" fill="none" />
        <g fill="#ff0" strokeLinejoin="bevel">
          <path d="M71.5 263.5h24v24h-24zM47.5 287.5h24v24h-24zM71.5 311.5h24v24h-24zM95.5 287.5h24v24h-24z" />
        </g>
      </g>
      <g stroke="#000" strokeWidth={0.5}>
        <path d="M83.5 11.5l72 72-72 72-72-72 72-72z" fill="currentColor" />
        <path d="M83.5 35.5l48 48-48 48-48-48 48-48z" fill="none" />
        <g fill="#0f0" strokeLinejoin="bevel">
          <path d="M71.5 47.5h24v24h-24zM47.5 71.5h24v24h-24zM71.5 95.5h24v24h-24zM95.5 71.5h24v24h-24z" />
        </g>
      </g>
      <g stroke="#000" strokeWidth={0.5}>
        <path d="M299.5 227.5l72 72-72 72-72-72 72-72z" fill="currentColor" />
        <path d="M299.5 251.5l48 48-48 48-48-48 48-48z" fill="none" />
        <g fill="#00f" strokeLinejoin="bevel">
          <path d="M287.5 263.5h24v24h-24zM263.5 287.5h24v24h-24zM287.5 311.5h24v24h-24zM311.5 287.5h24v24h-24z" />
        </g>
      </g>
      <g stroke="#000" strokeWidth={0.5}>
        <path d="M299.5 11.5l72 72-72 72-72-72 72-72z" fill="currentColor" />
        <path d="M299.5 35.5l48 48-48 48-48-48 48-48z" fill="none" />
        <g fill="red" strokeLinejoin="bevel">
          <path d="M287.5 47.5h24v24h-24zM263.5 71.5h24v24h-24zM287.5 95.5h24v24h-24zM311.5 71.5h24v24h-24z" />
        </g>
      </g>
    </svg>
  )
}

const ForwardRef = React.forwardRef(SvgComponent)
export default ForwardRef
