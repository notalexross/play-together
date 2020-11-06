import React, { useState, useEffect } from "react"
import serverUrl from "../serverUrl.js"
import Loading from "../components/Loading.js"

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const [ userData, setUserData ] = useState(JSON.parse(localStorage.getItem('userData')))
  const [ shouldUpdateUserData, setShouldUpdateUserData ] = useState(true)
  const [ isLoading, setIsLoading ] = useState(true)

  const setNickname = newNickname => {
    setUserData(user => ({ ...user, nickname: newNickname }))
    setShouldUpdateUserData(true)
  }


  useEffect(() => {
    if (shouldUpdateUserData) {

      let action
      if (userData && userData.id) {
        action = { type: "UPDATE_USER", payload: userData }
      } else {
        action = { type: "CREATE_USER", payload: userData }
      }

      const options = {
        method: "POST",
        body: JSON.stringify(action),
        headers: {
          'Content-Type': 'application/json'
        },
      }

      fetch(`${serverUrl}/users/`, options)
        .then(response => {
          if (!response.ok) throw new Error(response.status) // this wont actually show the message sent back
          return response.json()
        })
        .then(data => {
          setUserData(userData => {
            const newUserData = { ...userData, ...data }
            console.log(newUserData)
            localStorage.setItem('userData', JSON.stringify(newUserData))
            return { ...userData, ...data }
          })
          setShouldUpdateUserData(false)
          
        })
        .catch(e => console.error(e))
        .finally(() => setIsLoading(false))
    }

  }, [shouldUpdateUserData])
  
  return (
    <Provider value={{ ...userData, setNickname }} >
      {isLoading ? <><Loading /> user context</> : children}
    </Provider>
  )
}


export { context as userContext, ContextProvider as UserContextProvider }