import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { GlobalStyle } from './styles/global';
import { ResponsiveStyle } from './styles/responsive';
import { PreventTransitionsOnResize } from './components'
import * as ROUTES from './constants/routes'
import { UserContextProvider } from './context/user'
import Home from './pages/Home'
import GameRoom from './pages/GameRoom'

export default function App() {
  return (
    <>
      <GlobalStyle/>
      <ResponsiveStyle/>
      <PreventTransitionsOnResize/>
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
