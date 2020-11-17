import React from 'react'
import { Playarea } from '../components'

export default function GameContainer() {
  return (
    // <Playarea></Playarea>
    <div style={{background: 'yellow', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <div style={{height: '20px', width: '20px', background: 'blue'}}></div>
      <div style={{height: '20px', width: '20px', background: 'blue'}}></div>
    </div>
  )
}