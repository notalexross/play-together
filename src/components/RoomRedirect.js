import React, { useEffect, useState } from "react"
import { Redirect, useParams } from "react-router-dom"
import * as ROUTES from "../constants/routes"
import Loading from "./Loading.js"
import serverUrl from "../serverUrl.js"
import useFetch from "../hooks/useFetch.js"

export default function({ children }) {
  const { roomId } = useParams()
  const [ response, isLoading, error ] = useFetch(`${serverUrl}/games/${roomId}`) 


  // two requests going out to game room... one from here and one to sync game state (from useGame)... should here not just call syncGameState then?
  // and only once if can?

  console.log('===')
  console.log(roomId)
  console.log(response)
  console.log(isLoading)
  console.log(error)

  return (
    <>
      {isLoading ? <><Loading />room data</> : (response ? children : <Redirect to={ROUTES.HOME} />) }
    </>
  )
}