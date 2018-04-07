/**
 * @file Provides a `index` route
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Page from '../components/page.js'
import Article from '../components/article.js'

export default () =>
  <Page title="Keep diary of tasks"
        lead="How do you spend your day">
    <Article><strong>Here</strong> it all begins.</Article>
  </Page>
