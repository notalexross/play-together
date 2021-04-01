import React, { useContext, useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { firebaseContext } from '../context/firebase'
import { Loading } from '../components'
import NicknameModal from '../modals/nickname-modal'

export default function RoomRedirect({ children }) {
  const { doesRoomExist, user } = useContext(firebaseContext)
  const { roomId } = useParams()
  const [roomExists, setRoomExists] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  let render = <Loading />
  if (user && !isLoading) {
    if (roomExists) {
      if (user.displayName) {
        render = children
      } else {
        render = <NicknameModal onComplete={() => {}} isOpen />
      }
    } else {
      render = <Redirect to={ROUTES.HOME} />
    }
  }

  useEffect(() => {
    if (!user) return
    doesRoomExist(roomId).then(exists => {
      setRoomExists(exists)
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return render
}
