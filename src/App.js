import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { GlobalStyles } from './global-styles';
import * as ROUTES from './constants/routes'
import { UserContextProvider } from './context/userContext'
import { ModalsContextProvider } from './context/modalsContext'
import Home from './pages/Home'
import GameRoom from './pages/GameRoom'

export default function() {
  return (
    <>
      <GlobalStyles/>
      <Router>
        <UserContextProvider>
          <ModalsContextProvider>
            <Switch>
              <Route exact path={ROUTES.HOME}>
                <Home/>
              </Route>
              <Route exact path={`${ROUTES.GAMES}/:roomId`}>
                <GameRoom/>
              </Route>
            </Switch>
          </ModalsContextProvider>
        </UserContextProvider>
      </Router>
    </>
  )
}
