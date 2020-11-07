import React, { useState } from 'react'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const [ currentModal, setCurrentModal ] = useState()
    
  return (
    <Provider value={{ setCurrentModal }} >
      {children}
      {currentModal}
    </Provider>
  )
}


export { context as modalsContext, ContextProvider as ModalsContextProvider }