/**
 * @file Provides a `Page` component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { ApolloProvider } from 'react-apollo'

import Client from '../utils/client.js'
import Title from '../components/title.js'
import Lead from '../components/lead.js'

/**
 * `Page` provides the ApolloProvider, title, and lead paragraph
 * @param {string} title
 * @param {component} lead - lead paragraph/subtitle
 * @param {component} children - content
 */
export default ({ title, lead, children, ...props }) =>
  <ApolloProvider client={ Client }>
    <div>
      <Title title={ title }/>
      <Lead>{ lead }</Lead>
      { children }
    </div>
  </ApolloProvider>
