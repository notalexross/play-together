import React, { useState, useEffect } from 'react'
import SERVER_URL from '../constants/serverUrl'
import { Loading } from '../components'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const [ userData, setUserData ] = useState(JSON.parse(localStorage.getItem('userData')))
  const [ shouldUpdateUserData, setShouldUpdateUserData ] = useState(true)
  // const [ isLoading, setIsLoading ] = useState(true)


  // TODO
  const isLoading = false;

  const setNickname = newNickname => {
    setUserData(user => ({ ...user, nickname: newNickname }))
    setShouldUpdateUserData(true)
  }
  
  return (
    <Provider value={{ ...userData, setNickname }} >
      {isLoading ? <><Loading /> user context</> : children}
    </Provider>
  )
}


export { context as userContext, ContextProvider as UserContextProvider }