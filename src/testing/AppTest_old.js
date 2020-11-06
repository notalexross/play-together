import React, { useState, useRef, useEffect, useCallback } from 'react'
import Child from './Child'

function AppTest() {
  const [count,setCount] = useState(0)
  const [childCount,setChildCount] = useState(0)
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
  })

  const handleClick =  () => {
    setCount(prev => prev + 1)
  }
  const handleClickChild = useCallback(() => {
    setChildCount(prev => prev + 1)
  },[setChildCount])

  // if useState stuff within the child, then child and parent render separately...
  // ... otherwise parent will render every time child updates the state, since it is stored in the parent?
  // using setChildCount directly doesn't require callback, but handleClickChild does, otherwise the child will rerender every time the parent does
  // useMemo is for things like feeding an object to the child that doesn't change every time... use it like useCallback, but just give it the object instead of function.
  // useMemo(() => () => console.log('useMemo')) is basically the same as useCallback(() => console.log('useCallback')) (useCallback returns function, useMemo returns result of function)

  return (
    <div>
      <p>parent render count: {renderCount.current}</p>
      <p>parent count: {count}</p>
      <button onClick={handleClick}>increase parent count</button>
      <Child count={childCount} setCount={setChildCount} handleClick={handleClickChild} />
    </div>
  )
  
}

export default AppTest
