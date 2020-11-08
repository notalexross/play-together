import React from 'react'
import { GameContextProvider } from '../context/game'
import RoomRedirect from '../helpers/RoomRedirect'
import { Seat } from '../components'
import RoomContainer from '../containers/room'

export default function GameRoom() {
  return (
    <RoomRedirect>
      <GameContextProvider>
        <RoomContainer />
      </GameContextProvider>
    </RoomRedirect>
  )
}

// export default function GameRoom() {
//   const { roomId } = useParams()
//   const { nickname } = useContext(userContext)

//   return (
//     <RoomRedirect>
//       <GameContextProvider>
//         <Link to={ROUTES.HOME}>
//           <button>Home</button>
//         </Link>
//         <p>nickname: {nickname}</p> <ChangeNicknameButton/>
//         <p>roomId: {roomId}</p>
//         <br/>
//         <Seat />
//         <Seat />
//         <Seat />
//       </GameContextProvider>
//     </RoomRedirect>
//   )
// }
