import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { Loading } from '../components'
import SERVER_URL from '../constants/serverUrl'
import useFetch from '../hooks/useFetch'

export default function({ children }) {
  const { roomId } = useParams()

  // TODO
  // const [ response, isLoading, error ] = useFetch(`${SERVER_URL}/games/${roomId}`) 
  const response = true
  const isLoading = false
  const error = false

  // two requests going out to game room... one from here and one to sync game state (from useGame)... should here not just call syncGameState then?
  // and only once if can?

  console.log('===')
  console.log(roomId)
  console.log(response)
  console.log(isLoading)
  console.log(error)

  return isLoading ? <><Loading />room data</> : (response ? children : <Redirect to={ROUTES.HOME} />)
}