import { useState } from 'react'

export default function useForceRender() {
  const [value, setValue] = useState(0)

  return () => {
    setValue(value => value + 1)
  }
}
