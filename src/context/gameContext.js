import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useGame from '../hooks/useGame'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { roomId } = useParams()
  const game = useGame(roomId)
  const { syncGameState } = game

  useEffect(() => {
    syncGameState()
      .then(doesRoomExist => {
        console.log({doesRoomExist})
      })
  }, [])
    
  return (
    <Provider value={{ roomId, ...game }} >
      {children}
    </Provider>
  )
}


export { context as gameContext, ContextProvider as GameContextProvider }