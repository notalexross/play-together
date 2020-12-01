import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import DEFAULT_SETTINGS from '../constants/default-game-settings'
import { localSettingsContext } from './local-settings'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { changeLocalSetting } = useContext(localSettingsContext)
  const { roomId } = useParams()
  const [ isLoading, setIsLoading ] = useState(true)
  const [ globalSettings, setGlobalSettings ] = useState()

  const firebase = window.firebase
  const firestore = firebase.firestore()
  const roomRef = firestore.collection('rooms').doc(roomId)
  const settingsRef = roomRef.collection('settings').doc('settings')

  const changeGlobalSetting = (setting, value) => {
    console.log(`changing ${setting} to ${value}`)
    settingsRef.set({
      [setting]: value
    }, { merge: true })
  }

  const updateDefaultSettings = settings => {
    const newSettingsEntries = Object.keys(DEFAULT_SETTINGS).filter(key => settings === undefined || settings[key] === undefined).map(key => [key, DEFAULT_SETTINGS[key]])
    if (newSettingsEntries.length) {
      const newSettingsObject = Object.fromEntries(newSettingsEntries)
      settingsRef.set(newSettingsObject, { merge: true })
    }
  }

  const initSettingsListener = () => {
    return settingsRef.onSnapshot(snapshot => {
      const settings = snapshot.data()
      updateDefaultSettings(settings)
      setGlobalSettings(settings)
    })
  }

  useEffect(() => {
    return initSettingsListener()
  }, [])

  useEffect(() => {
    globalSettings ? setIsLoading(false) : setIsLoading(true)
  }, [globalSettings])

  useEffect(() => {
    globalSettings && globalSettings.game && changeLocalSetting('piecesGroup', globalSettings.game)
  }, [globalSettings && globalSettings.game])

  return (
    <Provider value={{ globalSettings, changeGlobalSetting }} >
      {isLoading ? null : children}
    </Provider>
  )
}

export { context as settingsContext, ContextProvider as SettingsContextProvider }