import React, { memo, useRef, useEffect, useContext } from 'react'
import useCounter from '../hooks/useCounter.js'
import { context } from "../context/context.js"

function Child() {
  // const [ count, increment ] = useCounter()
  const { count, increment } = useContext(context)

  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
  })

  return (
    <div>
      <p>child render count: {renderCount.current}</p>
      <p>child count: {count}</p>
      <button onClick={increment}>increase child count</button>
    </div>
  )
  
}

// export default memo(Child)
export default Child
