import React, { memo, useState, useRef, useEffect } from 'react'

function Child({count,setCount,handleClick}) {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
  })

  return (
    <div>
      <p>child render count: {renderCount.current}</p>
      <p>child count: {count}</p>
      <button onClick={handleClick}>increase child count</button>
    </div>
  )
  
}

export default memo(Child)
