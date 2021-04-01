import { useState } from 'react'

export default function useForceRender() {
  const [, setValue] = useState(0)

  return () => {
    setValue(state => state + 1)
  }
}
