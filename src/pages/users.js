/**
 * @file Provides a `users` route for a fetched list of users
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Article from '../components/article.js'
import Users from '../components/users.js'
import Page from '../components/page.js'

export default () =>
  <Page title="Users"
        lead="List of users of the site">
    <Article>
      <Users/>
    </Article>
  </Page>
