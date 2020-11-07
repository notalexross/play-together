import React, { useState } from 'react'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
    const [ count, setCount ] = useState(0)

    const increment = () => setCount(count => count + 1)
    const decrement = () => setCount(count => count - 1)

    return (
        <Provider value={{ count, increment, decrement }}>
            {children}
        </Provider>
    )
}

export { context, ContextProvider }