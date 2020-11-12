import React, { useState, useEffect } from 'react'

export default function useWindowSize() {
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

  return { windowWidth: width, windowHeight: height }
}