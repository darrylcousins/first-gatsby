import React from 'react'
import { ApolloProvider } from 'react-apollo'

import Client from '../utils/client.js'
import Title from '../components/title.js'
import Lead from '../components/lead.js'

export default () =>
  <ApolloProvider client={Client}>
    <div>
      <Title text="Keep diary of tasks"/>
      <Lead text="How do you spend your day?"/>
    </div>
  </ApolloProvider>
