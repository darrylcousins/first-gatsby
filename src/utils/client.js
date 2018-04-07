/**
 * @file Provides a `client` for graphql queries
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:4000/graphql'
})

const authLink = setContext((request, { headers }) => {
  const token = localStorage.getItem('token');
  console.log("TOKEN:", token)
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
})

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
})
