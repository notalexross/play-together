import { useEffect, useState, useRef } from 'react'

export default function(url, options = {}) {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ error, setError ] = useState(null)
  const [ response, setResponse ] = useState(null)

  useEffect(() => {
    let isCurrent = true

    fetch(url, options)
      .then(response => {
        if(!response.ok) throw new Error(response.status)
        return response.json()
      })
      .then(data => isCurrent && setResponse(data))
      .catch(e => isCurrent && setError(e))
      .finally(() => isCurrent && setIsLoading(false))
    
    return () => {isCurrent = false}

  }, [])

  return [ response, isLoading, error ]
}