import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Users from '../components/users.js'
import Header from '../components/header.js'
import Home from '../components/home.js'

function App(props) {
  return (
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/users" component={ Users } />
      </Switch>
    </div>
  )
}

export default App
