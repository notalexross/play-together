import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './styles/App.css'
import * as ROUTES from "./constants/routes"
import { UserContextProvider } from './context/userContext.js'
import { ModalsContextProvider } from './context/modalsContext.js'
import Home from "./pages/Home.js"
import GameRoom from "./pages/GameRoom.js"

export default function() {
  return (
    <Router>
      <UserContextProvider>
        <ModalsContextProvider>
          <Switch>
            <Route exact path={ROUTES.HOME}>
              <Home />
            </Route>
            <Route exact path={`${ROUTES.GAMES}/:roomId`}>
              <GameRoom />
            </Route>
          </Switch>
        </ModalsContextProvider>
      </UserContextProvider>
    </Router>
  )
}
