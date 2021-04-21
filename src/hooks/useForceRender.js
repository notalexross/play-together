import { useState, useCallback } from 'react'

export default function useForceRender() {
  const [, setValue] = useState(0)

  const forceRender = useCallback(() => {
    setValue(state => state + 1)
  }, [])

  return forceRender
}
