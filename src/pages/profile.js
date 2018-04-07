/**
 * @file Provides a `profile` route to develop authenticatio
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Article from '../components/article.js'
import Page from '../components/page.js'
import Profile from '../components/profile.js'

export default () =>
  <Page title="Password protected page"
        lead="Cool that you're here.">
    <Article>
      <Profile/>
    </Article>
  </Page>

