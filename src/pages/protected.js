import React from 'react'
import { ApolloProvider } from 'react-apollo'

import Client from '../utils/client.js'
import Article from '../components/article.js'
import Lead from '../components/lead.js'
import Title from '../components/title.js'
import Protected from '../components/protected.js'

export default () =>
  <ApolloProvider client={Client}>
    <div>
      <Title text="Password protected"/>
      <Lead text="Login to view"/>
      <Article>
        <Protected/>
      </Article>
    </div>
  </ApolloProvider>

