import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const Q = gql`
  {
    currentUser {
      username
    }
  }
`

const Protected = ({ refetch }) => (
  <Query
    query={ Q }
    fetchPolicy={ refetch ? 'cache-and-network': 'cache-first' }
  >
    {({ loading, error, data: { currentUser } }) => {
      if (loading) return <span>loading....</span>
      if (error) return <span>error....</span>
      if (currentUser == null) window.location.replace('/login')
      return <h1>Welcome back {currentUser.username}</h1>
    }}
  </Query>
)

export default Protected
