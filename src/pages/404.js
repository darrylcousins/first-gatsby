/**
 * @file Provides a `404` route
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Title from '../components/title.js'
import Lead from '../components/lead.js'

export default() =>
  <div>
    <Title text="Oops 404"/>
    <Lead>Page not found</Lead>
  </div>
