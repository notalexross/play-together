import { useState, useRef, useEffect } from 'react'

export default function useHover(componentRef) {
  const [isHovered, setIsHovered] = useState(false)
  const defaultRef = useRef(null)

  const hoverRef = componentRef || defaultRef

  useEffect(() => {
    const ref = hoverRef.current

    const onMouseEnter = () => setIsHovered(true)
    const onMouseLeave = () => setIsHovered(false)
    const onTouchStart = () => setIsHovered(true)

    ref.addEventListener('mouseenter', onMouseEnter)
    ref.addEventListener('mouseleave', onMouseLeave)
    ref.addEventListener('touchstart', onTouchStart)

    return () => {
      ref.removeEventListener('mouseenter', onMouseEnter)
      ref.removeEventListener('mouseleave', onMouseLeave)
      ref.removeEventListener('touchstart', onTouchStart)
    }
  }, [hoverRef])

  return [isHovered, hoverRef]
}
