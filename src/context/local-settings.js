import React, { useState, useEffect, useContext } from 'react'
import DEFAULT_LOCAL_SETTINGS from '../constants/default-local-settings'
import { firebaseContext } from '../context/firebase'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { user } = useContext(firebaseContext)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ localSettings, setLocalSettings ] = useState()

  const firebase = window.firebase
  const firestore = firebase.firestore()
  const userRef = firestore.collection('users').doc(user.uid)
  const settingsRef = userRef.collection('settings').doc('settings')

  const changeLocalSetting = (setting, value) => {
    console.log(`changing ${setting} to ${value}`)
    settingsRef.set({
      [setting]: value
    }, { merge: true })
  }

  const updateDefaultSettings = settings => {
    const newSettingsEntries = Object.keys(DEFAULT_LOCAL_SETTINGS).filter(key => settings === undefined || settings[key] === undefined).map(key => [key, DEFAULT_LOCAL_SETTINGS[key]])
    if (newSettingsEntries.length) {
      const newSettingsObject = Object.fromEntries(newSettingsEntries)
      settingsRef.set(newSettingsObject, { merge: true })
    }
  }

  const initSettingsListener = () => {
    return settingsRef.onSnapshot(snapshot => {
      const settings = snapshot.data()
      updateDefaultSettings(settings)
      setLocalSettings(settings)
    })
  }

  useEffect(() => {
    return initSettingsListener()
  }, [])

  useEffect(() => {
    localSettings ? setIsLoading(false) : setIsLoading(true)
  }, [localSettings])

  return (
    <Provider value={{ localSettings, changeLocalSetting }} >
      {isLoading ? null : children}
    </Provider>
  )
}

export { context as localSettingsContext, ContextProvider as LocalSettingsContextProvider }