import { useState, useRef, useEffect } from 'react'

export default function useHover(hoverRef) {
  const [ isHovered, setIsHovered ] = useState(false)
  const defaultRef = useRef(null)

  hoverRef = hoverRef || defaultRef

  useEffect(() => {
    const ref = hoverRef.current

    const onMouseEnter = () => {setIsHovered(true)}
    const onMouseLeave = () => {setIsHovered(false)}
    const onTouchStart = () => {setIsHovered(true)}
    // const onTouchEnd = () => {setIsHovered(false)}

    ref.addEventListener('mouseenter', onMouseEnter)
    ref.addEventListener('mouseleave', onMouseLeave)
    ref.addEventListener('touchstart', onTouchStart)
    // ref.addEventListener('touchend', onTouchEnd)

    return () => {
      ref.removeEventListener('mouseenter', onMouseEnter)
      ref.removeEventListener('mouseleave', onMouseLeave)
      ref.removeEventListener('touchstart', onTouchStart)
      // ref.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return [ isHovered, hoverRef ]
}