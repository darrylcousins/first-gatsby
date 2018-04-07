/**
 * @file Provides a `Lead` layout component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Settings from '../utils/settings.js'

/**
 * `Lead` provides the layout for a lead paragraph/subtitle
 * @param {component} children - content
 */
export default ({ children }) =>
  <p className={ Settings.style.lead }>
    { children }
  </p>
