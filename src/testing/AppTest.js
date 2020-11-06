import React, { useState, useRef, useEffect, useContext } from 'react'
import Child from './Child'
import useCounter from '../hooks/useCounter.js'
import { context } from "../context/context.js"


function AppTest() {
  const [ count, increment ] = useCounter()
  // const { decrement } = useContext(context)
  const renderCount = useRef(0)
  
  useEffect(() => {
    renderCount.current++
  })

  return (
    <div>
      <p>parent render count: {renderCount.current}</p>
      <p>parent count: {count}</p>
      <button onClick={increment}>increase parent count</button>
      <Child />
    </div>
  )
  
}

export default AppTest
