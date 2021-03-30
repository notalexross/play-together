import { useState } from 'react'

export default function useForceRender() {
  // eslint-disable-next-line
  const [value, setValue] = useState(0)

  return () => {
    setValue(value => value + 1)
  }
}
