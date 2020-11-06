import React, { useContext } from "react"
import { gameContext } from "../context/gameContext.js"
import useFetch from "../hooks/useFetch.js"

export default function() {
  const { roomId, sitDown } = useContext(gameContext)
  // const [ response, isLoading, error ] = useFetch('https://jsonplaceholder.typicode.com/todos/1')

  // check in context whether seat is taken and details of the person in the seat

  return (
    <div className="seat">
      <p>{roomId}</p>
      <br/>
      <button onClick={() => sitDown(123456, 0)}>sit down</button>
    </div>
  )
  // return (
  //   <div className="seat">
  //     <p>{roomId}</p>
  //     <br/>
  //     <button onClick={() => sitDown(123456, 0)}>sit down</button>
  //     <br/>
  //     {isLoading && <p>loading...</p>}
  //     {response && <p>{JSON.stringify(response)}</p>}
  //     {error && <p>{error.toString()}</p>}
  //   </div>
  // )
}