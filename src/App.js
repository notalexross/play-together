import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { GlobalStyles } from './global-styles';
import * as ROUTES from './constants/routes'
import { UserContextProvider } from './context/userContext'
import Home from './pages/Home'
import GameRoom from './pages/GameRoom'

export default function() {
  return (
    <>
      <GlobalStyles/>
      <Router>
        <UserContextProvider>
          <Switch>
            <Route exact path={ROUTES.HOME}>
              <Home/>
            </Route>
            <Route exact path={`${ROUTES.GAMES}/:roomId`}>
              <GameRoom/>
            </Route>
          </Switch>
        </UserContextProvider>
      </Router>
    </>
  )
}
