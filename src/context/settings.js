import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DEFAULT_SETTINGS from '../constants/default-game-settings'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { roomId } = useParams()
  const [ isLoading, setIsLoading ] = useState(true)
  const [ currentSettings, setCurrentSettings ] = useState()

  const firebase = window.firebase
  const firestore = firebase.firestore()
  const roomRef = firestore.collection('rooms').doc(roomId)
  const settingsRef = roomRef.collection('settings').doc('settings')

  const changeSetting = (setting, value) => {
    console.log(`changing ${setting} to ${value}`)
    settingsRef.set({
      [setting]: value
    }, { merge: true })
  }

  const updateDefaultSettings = settings => {
    const newSettingsEntries = Object.keys(DEFAULT_SETTINGS).filter(key => settings[key] === undefined).map(key => [key, DEFAULT_SETTINGS[key]])
    if (newSettingsEntries.length) {
      const newSettingsObject = Object.fromEntries(newSettingsEntries)
      settingsRef.set(newSettingsObject, { merge: true })
    }
  }

  const initSettingsListener = () => {
    return settingsRef.onSnapshot(snapshot => {
      const settings = snapshot.data()
      updateDefaultSettings(settings)
      setCurrentSettings(settings)
    })
  }

  useEffect(() => {
    return initSettingsListener()
  }, [])

  useEffect(() => {
    currentSettings ? setIsLoading(false) : setIsLoading(true)
  }, [currentSettings])

  return (
    <Provider value={{ currentSettings, changeSetting }} >
      {isLoading ? null : children}
    </Provider>
  )
}

export { context as settingsContext, ContextProvider as SettingsContextProvider }