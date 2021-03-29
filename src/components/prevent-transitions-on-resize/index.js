import React, { useEffect } from 'react'
import { PreventTransitions } from './styles'

export default function PreventTransitionsOnResize() {
  useEffect(() => {
    let resizeTimeout
    const handleResize = () => {
      document.body.classList.add('prevent-transitions')
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        document.body.classList.remove('prevent-transitions')
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <PreventTransitions />
}
