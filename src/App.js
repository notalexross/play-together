import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import GlobalStyle from './styles/global'
import { PreventTransitionsOnResize } from './components'
import * as ROUTES from './constants/routes'
import { WindowContextProvider } from './context/window'
import { FirebaseContextProvider } from './context/firebase'
import Home from './pages/Home'
import GameRoom from './pages/GameRoom'

export default function App() {
  return (
    <FirebaseContextProvider>
      <GlobalStyle />
      <PreventTransitionsOnResize />
      <Router>
        <WindowContextProvider>
          <Switch>
            <Route exact path={ROUTES.HOME}>
              <Home />
            </Route>
            <Route exact path={`${ROUTES.GAMES}/:roomId`}>
              <GameRoom />
            </Route>
          </Switch>
        </WindowContextProvider>
      </Router>
    </FirebaseContextProvider>
  )
}
