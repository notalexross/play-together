import { useState } from "react"

export default function() {
    const [ count, setCount ] = useState(0)

    const increment = () => setCount(count => count + 1)
    const decrement = () => setCount(count => count - 1)

    return [ count, increment, decrement ]
}