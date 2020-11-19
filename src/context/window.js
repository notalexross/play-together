import React, { useEffect, useState } from 'react'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const [ width, setWidth ] = useState()
  const [ height, setHeight ] = useState()

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
    
  return (
    <Provider value={{ windowWidth: width, windowHeight: height }} >
      {children}
    </Provider>
  )
}


export { context as windowContext, ContextProvider as WindowContextProvider }