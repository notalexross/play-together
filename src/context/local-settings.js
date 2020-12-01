import React, { useState, useEffect, useContext } from 'react'
import DEFAULT_LOCAL_SETTINGS from '../constants/default-local-settings'
import { firebaseContext } from './firebase'
import setsConfig from '../constants/sets-config'
import piecesConfig from '../constants/pieces-config'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { user } = useContext(firebaseContext)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ localSettings, setLocalSettings ] = useState()
  const [ piecesGroup, setPiecesGroup ] = useState([])
  const [ favorites, setFavorites ] = useState([])

  const firebase = window.firebase
  const firestore = firebase.firestore()
  const userRef = firestore.collection('users').doc(user.uid)
  const settingsRef = userRef.collection('settings').doc('settings')
  const favoritesRef = userRef.collection('settings').doc('favorites')

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

  const updatePiecesGroup = () => {
    if (localSettings.piecesGroup === 'favorites') {
      setPiecesGroup(favorites)
    } else {
      const set = setsConfig[localSettings.piecesGroup] || []
      !set.length && console.log('remember to add new pieces to config files before trying to use them!')
      const setMapped = set.map(piece => ({id: piece, ...piecesConfig[piece]}))
      setPiecesGroup(setMapped)
    }
  }

  const addToFavorites = piece => {
    if (favorites.some(favorite => favorite.id === piece.id)) return
    favoritesRef.set({
      pieces: [ ...favorites, piece ]
    })
  }

  const removeFromFavorites = pieceId => {
    favoritesRef.set({
      pieces: [ ...favorites.filter(favorite => favorite.id !== pieceId) ]
    })
  }

  const initFavoritesListener = () => {
    return favoritesRef.onSnapshot(snapshot => {
      const data = snapshot.data() && snapshot.data().pieces
      data && setFavorites(data)
    })
  }

  useEffect(() => {
    const settingsListener = initSettingsListener()
    const favoritesListener = initFavoritesListener()
    return () => {
      settingsListener()
      favoritesListener()
    }
  }, [])

  useEffect(() => {
    localSettings ? setIsLoading(false) : setIsLoading(true)
  }, [localSettings])

  useEffect(() => {
     if (localSettings && localSettings.piecesGroup) {
      setIsLoading(false)
      updatePiecesGroup()
     } else {
       setIsLoading(true)
     }
  }, [localSettings && localSettings.piecesGroup, favorites])

  return (
    <Provider value={{ localSettings, piecesGroup, changeLocalSetting, addToFavorites, removeFromFavorites, favorites }} >
      {isLoading ? null : children}
    </Provider>
  )
}

export { context as localSettingsContext, ContextProvider as LocalSettingsContextProvider }