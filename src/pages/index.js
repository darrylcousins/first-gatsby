import React from 'react'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import App from '../components/app.js'

const client = new ApolloClient({ uri: 'http://127.0.0.1:4000/graphql' })

export default () =>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
