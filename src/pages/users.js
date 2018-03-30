import React from 'react'
import { ApolloProvider } from 'react-apollo'

import client from '../utils/client.js'
import Article from '../components/article.js'
import Lead from '../components/lead.js'
import Title from '../components/title.js'
import Users from '../components/users.js'

export default () =>
  <ApolloProvider client={client}>
    <div>
      <Title text="Users"/>
      <Lead text="List of users of the site"/>
      <Article>
        <Users/>
      </Article>
    </div>
  </ApolloProvider>
