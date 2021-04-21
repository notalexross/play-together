import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react'
import DEFAULT_LOCAL_SETTINGS from '../constants/default-local-settings'
import { firebaseContext } from './firebase'
import setsConfig from '../constants/sets-config'
import piecesConfig from '../constants/pieces-config'
import gamesConfig from '../constants/games-config'
import { settingsContext } from './settings'

const context = React.createContext()
const { Provider } = context

function ContextProvider({ children }) {
  const { user } = useContext(firebaseContext)
  const { globalSettings } = useContext(settingsContext)
  const [isLoading, setIsLoading] = useState(true)
  const [localSettings, setLocalSettings] = useState({})
  const [piecesGroup, setPiecesGroup] = useState([])
  const [favorites, setFavorites] = useState([])

  const globalSettingsGame = globalSettings && globalSettings.game
  const localSettingsPiecesGroup = localSettings && localSettings.piecesGroup
  const gameSettings = gamesConfig[globalSettingsGame] || gamesConfig.default

  const { firebase } = window
  const firestore = firebase.firestore()
  const userRef = useMemo(() => firestore.collection('users').doc(user.uid), [firestore, user.uid])
  const settingsRef = useMemo(() => userRef.collection('settings').doc('settings'), [userRef])
  const favoritesRef = useMemo(() => userRef.collection('settings').doc('favorites'), [userRef])

  const changeLocalSetting = useCallback((setting, value) => {
    settingsRef.set({ [setting]: value }, { merge: true })
  }, [settingsRef])

  const rotatePlayarea = to => {
    const newAngle =
      to !== undefined ? to : (localSettings.rotation + gameSettings.rotationIncrement) % 360

    changeLocalSetting('rotation', newAngle)
  }

  const getRotatedPosition = useCallback((mouseX, mouseY, angle = localSettings.rotation) => {
    const angleRadians = (angle / 180) * Math.PI
    const translatedX = mouseX - 50
    const translatedY = mouseY - 50
    const rotatedX = translatedX * Math.cos(angleRadians) - translatedY * Math.sin(angleRadians)
    const rotatedY = translatedY * Math.cos(angleRadians) + translatedX * Math.sin(angleRadians)
    const untranslatedX = rotatedX + 50
    const untranslatedY = rotatedY + 50
    return [untranslatedX, untranslatedY]
  }, [localSettings.rotation])

  const getUnrotatedPosition = (mouseX, mouseY) => (
    getRotatedPosition(mouseX, mouseY, -localSettings.rotation)
  )

  const addToFavorites = piece => {
    if (favorites.some(favorite => favorite.id === piece.id)) return
    favoritesRef.set({
      pieces: [...favorites, piece]
    })
  }

  const removeFromFavorites = pieceId => {
    favoritesRef.set({
      pieces: [...favorites.filter(favorite => favorite.id !== pieceId)]
    })
  }

  useEffect(() => {
    const updateDefaultSettings = settings => {
      const newSettingsEntries = Object.keys(DEFAULT_LOCAL_SETTINGS)
        .filter(key => settings === undefined || settings[key] === undefined)
        .map(key => [key, DEFAULT_LOCAL_SETTINGS[key]])

      if (newSettingsEntries.length) {
        const newSettingsObject = Object.fromEntries(newSettingsEntries)
        settingsRef.set(newSettingsObject, { merge: true })
      }
    }

    const initSettingsListener = () => {
      const listener = settingsRef.onSnapshot(snapshot => {
        const settings = snapshot.data()
        updateDefaultSettings(settings)
        setLocalSettings(settings)
      })
      return listener
    }

    const initFavoritesListener = () => {
      const listener = favoritesRef.onSnapshot(snapshot => {
        const data = snapshot.data() && snapshot.data().pieces
        data && setFavorites(data)
      })
      return listener
    }

    const settingsListener = initSettingsListener()
    const favoritesListener = initFavoritesListener()

    return () => {
      settingsListener()
      favoritesListener()
    }
  }, [favoritesRef, settingsRef])

  useEffect(() => {
    localSettings ? setIsLoading(false) : setIsLoading(true)
  }, [localSettings])

  useEffect(() => {
    const updatePiecesGroup = () => {
      if (localSettingsPiecesGroup === 'favorites') {
        setPiecesGroup(favorites)
      } else {
        const set = setsConfig[localSettingsPiecesGroup] || []
        if (!set.length) {
          console.error('remember to add new pieces to config files before trying to use them!')
        }
        const setMapped = set.map(piece => ({ id: piece, ...piecesConfig[piece] }))
        setPiecesGroup(setMapped)
      }
    }

    if (localSettingsPiecesGroup) {
      setIsLoading(false)
      updatePiecesGroup()
    } else {
      setIsLoading(true)
    }
  }, [localSettingsPiecesGroup, favorites])

  useEffect(() => {
    if (globalSettingsGame) {
      changeLocalSetting('piecesGroup', globalSettingsGame)
    }
  }, [changeLocalSetting, globalSettingsGame])

  return (
    <Provider
      value={{
        localSettings,
        piecesGroup,
        changeLocalSetting,
        addToFavorites,
        removeFromFavorites,
        favorites,
        rotatePlayarea,
        getRotatedPosition,
        getUnrotatedPosition
      }}
    >
      {isLoading ? null : children}
    </Provider>
  )
}

export { context as localSettingsContext, ContextProvider as LocalSettingsContextProvider }
