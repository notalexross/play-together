import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import DEFAULT_SETTINGS from '../constants/default-game-settings'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { roomId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [globalSettings, setGlobalSettings] = useState()

  const { firebase } = window
  const firestore = firebase.firestore()
  const roomRef = useMemo(() => firestore.collection('rooms').doc(roomId), [firestore, roomId])
  const settingsRef = useMemo(() => roomRef.collection('settings').doc('settings'), [roomRef])

  const changeGlobalSetting = (setting, value) => {
    settingsRef.set({ [setting]: value }, { merge: true })
  }

  useEffect(() => {
    const updateDefaultSettings = settings => {
      const newSettingsEntries = Object.keys(DEFAULT_SETTINGS)
        .filter(key => settings === undefined || settings[key] === undefined)
        .map(key => [key, DEFAULT_SETTINGS[key]])

      if (newSettingsEntries.length) {
        const newSettingsObject = Object.fromEntries(newSettingsEntries)
        settingsRef.set(newSettingsObject, { merge: true })
      }
    }

    const initSettingsListener = () => {
      const listener = settingsRef.onSnapshot(snapshot => {
        const settings = snapshot.data()
        updateDefaultSettings(settings)
        setGlobalSettings(settings)
      })
      return listener
    }

    return initSettingsListener()
  }, [settingsRef])

  useEffect(() => {
    globalSettings ? setIsLoading(false) : setIsLoading(true)
  }, [globalSettings])

  return (
    <Provider value={{ globalSettings, changeGlobalSetting }}>
      {isLoading ? null : children}
    </Provider>
  )
}

export { context as settingsContext, ContextProvider as SettingsContextProvider }
