/**
 * @file Provides a `login` route
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Article from '../components/article.js'
import Page from '../components/page.js'
import Login from '../components/login.js'

export default () =>
  <Page title="Login"
        lead="Enter your username and password to log in.">
    <Article>
      <Login/>
    </Article>
  </Page>
