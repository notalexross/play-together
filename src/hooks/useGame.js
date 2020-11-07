import { useEffect } from 'react'
import SERVER_URL from '../constants/serverUrl'

export default function useGame(roomId) {
  // const [ state, dispatch ] = useReducer(gameReducer, {
  //   roomId: null,
  //   seatedPlayers: [],

  // })
  const dispatch = (action) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(action),
      headers: {
        'Content-Type': 'application/json'
      },
    }

    console.log(`posting to server: ${JSON.stringify(action)}`)

    fetch(`${SERVER_URL}/games/${roomId}`, options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(e => console.error(e))
  }

  const syncGameState = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/games/${roomId}`)
      // const response = await fetch(`http://localHost:5000/api/games/${roomId}`)
      if (response.status === 400) return false
      if (!response.ok) throw new Error(response.status) // this wont actually show the message sent back
      const data = await response.json()
      // set gameData to data
      return true
    } catch(e) {
      console.error(e)
    }
  }

  // TODO
  // const sitDown = (userId, seatId) => dispatch({ type: 'SIT_DOWN', payload: { seatId, userId }})
  const sitDown = (userId, seatId) => console.log({ userId, seatId })
  const standUp = (userId) => dispatch({ type: 'STAND_UP', payload: { userId }})

  useEffect(() => {
    // setup webhooks with server to send and receive state?
    // server should send actions to be input to reducer
    // client should send actions to server
    // results should end up being synced without sending much info
    // reducer should be same on server side as on client side, but with authentication

  }, [])

  return { syncGameState, sitDown, standUp }
}

// function gameReducer(state, action) {
//   switch (action.type) {
//     case 'SIT_DOWN': {
//       return { ...state, seatedPlayers: [ ...state.seatedPlayers, action.payload. ] }
//     }
//     case 'STAND_UP': {
//       return
//     }
//     default: {
//       return state
//     }
//   }
// }