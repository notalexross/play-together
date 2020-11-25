import React, { useContext, useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { firebaseContext } from '../context/firebase'
import { Loading } from '../components'

export default function RoomRedirect({ children }) {
  const { doesRoomExist } = useContext(firebaseContext)
  const { roomId } = useParams()
  const [ roomExists, setRoomExists ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    doesRoomExist(roomId).then(exists => {
      setRoomExists(exists)
      setIsLoading(false)
    })
  }, [])

  return isLoading ? <><Loading />room data</> : (roomExists ? children : <Redirect to={ROUTES.HOME} />)
}